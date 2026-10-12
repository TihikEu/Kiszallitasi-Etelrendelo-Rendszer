(function () {
    "use strict";

    const SVG_NS = "http://www.w3.org/2000/svg";
    const RADIUS = 42;
    const LEAVE_MS = 400;
    const GOLDEN_ANGLE = 137.508;

    const WAVE_MS = 2400;
    const WAVE_FROM = 14;
    const WAVE_TO = 154;
    const PULSE_MS = 900;

    const points = new Map();
    const uids = new WeakMap();
    let nextUid = 1;

    let map = null;
    let linesSvg = null;
    let pointsLayer = null;
    let scheduled = false;
    let epoch = 0;

    function init() {
        map = document.querySelector(".map");
        if (!map || map.querySelector(".radar-center")) return;

        linesSvg = document.createElementNS(SVG_NS, "svg");
        linesSvg.setAttribute("class", "radar-lines");

        const center = document.createElement("div");
        center.className = "radar-center";

        pointsLayer = document.createElement("div");

        map.append(linesSvg, center, pointsLayer);

        epoch = Number(document.timeline.currentTime) || 0;
        const wave = document.getAnimations().find(a => a.animationName === "radar-pulse");
        if (wave) wave.startTime = epoch;
    }

    function uidOf(order) {
        if (!uids.has(order)) uids.set(order, nextUid++);
        return uids.get(order);
    }

    function positionFor(uid) {
        const angle = (uid * GOLDEN_ANGLE) % 360;
        const distance = 0.35 + ((uid * 37) % 60) / 100;

        const rad = (angle * Math.PI) / 180;
        const d = distance * RADIUS;

        return {
            x: 50 + Math.sin(rad) * d,
            y: 50 - Math.cos(rad) * d
        };
    }

    function timeAtProgress(progress) {
        let lo = 0, hi = 1;
        for (let i = 0; i < 24; i++) {
            const s = (lo + hi) / 2;
            const y = 3 * (1 - s) * s * s + s * s * s;
            if (y < progress) lo = s; else hi = s;
        }
        const s = (lo + hi) / 2;
        return 3 * (1 - s) * s * s * 0.58 + s * s * s;
    }

    function delayFor(x, y) {
        const dx = ((x - 50) / 100) * map.clientWidth;
        const dy = ((y - 50) / 100) * map.clientHeight;
        const d = Math.hypot(dx, dy);

        const progress = Math.min(Math.max((d - WAVE_FROM) / (WAVE_TO - WAVE_FROM), 0), 1);
        return timeAtProgress(progress) * WAVE_MS;
    }

    function startPulse(p) {
        p.pulse = p.ring.animate(
            [
                { transform: "scale(1)", opacity: 0.6, easing: "ease-out" },
                { transform: "scale(4)", opacity: 0, offset: PULSE_MS / WAVE_MS },
                { transform: "scale(4)", opacity: 0 }
            ],
            { duration: WAVE_MS, iterations: Infinity, delay: delayFor(p.x, p.y) }
        );
        p.pulse.startTime = epoch;
    }

    function retime() {
        for (const p of points.values()) {
            p.pulse.effect.updateTiming({ delay: delayFor(p.x, p.y) });
        }
    }

    function setStatus(p, status) {
        for (const el of [p.dot, p.line]) {
            el.classList.remove("st-keszul", "st-futarnal");
            if (status) el.classList.add("st-" + status);
        }
    }

    function labelOf(order) {
        return String(order.getId()).replace(/<[^>]*>/g, "");
    }

    function addPoint(order, status) {
        const { x, y } = positionFor(uidOf(order));

        const line = document.createElementNS(SVG_NS, "line");
        line.setAttribute("x1", "50%");
        line.setAttribute("y1", "50%");
        line.setAttribute("x2", x + "%");
        line.setAttribute("y2", y + "%");
        linesSvg.appendChild(line);

        const dot = document.createElement("div");
        dot.className = "radar-point";
        dot.style.left = x + "%";
        dot.style.top = y + "%";
        dot.dataset.label = labelOf(order);
        if (y < 20) dot.classList.add("below");

        const ring = document.createElement("div");
        ring.className = "radar-ring";
        dot.appendChild(ring);
        pointsLayer.appendChild(dot);

        const p = { dot, line, ring, x, y };
        setStatus(p, status);
        startPulse(p);
        points.set(order, p);
    }

    function removePoint(order) {
        const p = points.get(order);
        if (!p) return;

        points.delete(order);
        p.pulse.cancel();
        p.dot.classList.add("leaving");
        p.line.classList.add("leaving");

        setTimeout(() => {
            p.dot.remove();
            p.line.remove();
        }, LEAVE_MS);
    }

    function readActiveOrders() {
        const active = new Map();

        if (typeof rendelesek === "undefined") return active;

        for (const r of rendelesek) {
            const s = r.getStatusz();
            if (s === "Kiszallitva") continue;

            active.set(r, s === "Futarnal" ? "futarnal" : "keszul");
        }

        return active;
    }

    function sync() {
        scheduled = false;
        if (!map) return;

        const active = readActiveOrders();

        for (const order of [...points.keys()]) {
            if (!active.has(order)) removePoint(order);
        }

        for (const [order, status] of active) {
            if (points.has(order)) {
                const p = points.get(order);
                setStatus(p, status);
                p.dot.dataset.label = labelOf(order);
            } else {
                addPoint(order, status);
            }
        }
    }

    function schedule() {
        if (scheduled) return;
        scheduled = true;
        requestAnimationFrame(sync);
    }

    function start() {
        init();
        if (!map) return;

        const tbody = document.querySelector(".rendelesek tbody");
        if (tbody) {
            new MutationObserver(schedule).observe(tbody, { childList: true });
        }

        sync();
        new ResizeObserver(retime).observe(map);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", start);
    } else {
        start();
    }

    window.Radar = { sync };
})();