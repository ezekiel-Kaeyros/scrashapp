import "./style.css";
import javascriptLogo from "./javascript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.js";

const scratchCards = () => {
  const canvases = document.querySelectorAll(".scratch-canvas");
  const tickets = document.querySelectorAll(".scratch-ticket");
  const ticketGagnant = Math.floor(Math.random() * 4);
  let isAnyCardScratched = -1;

  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };

  const getScratchCoordinates = (event, canvas) => {
    const rect = canvas.getBoundingClientRect();
    if (event.touches) {
      return {
        x: event.touches[0].clientX - rect.left,
        y: event.touches[0].clientY - rect.top,
      };
    } else {
      return {
        x: event.offsetX,
        y: event.offsetY,
      };
    }
  };
  const initCanvasTicket = async (ticket, index) => {
    try {
      if (index === ticketGagnant) {
        const backgroundImageUrl = `./img/scratch_win.png`;
        ticket.style.backgroundImage = `url(${backgroundImageUrl})`;
        ticket.style.backgroundSize = "cover";
        ticket.style.backgroundPosition = "center";
      } else {
        const backgroundImageUrl = `./img/you_lose.png`;
        ticket.style.backgroundImage = `url(${backgroundImageUrl})`;
        ticket.style.backgroundSize = "cover";
        ticket.style.backgroundPosition = "center";
      }
    } catch (error) {
      console.error("Error loading image:", error);
    }
  };
  const initCanvas = async (canvas, index) => {
    let id = index;
    const context = canvas.getContext("2d");
    try {
      const img = await loadImage("./img/scratch_to_win.jpg");
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    } catch (error) {
      console.error("Error loading image:", error);
    }

    let isDragging = false;

    const scratch = (x, y) => {
      context.globalCompositeOperation = "destination-out";
      context.beginPath();
      context.arc(x, y, 20, 0, 2 * Math.PI);
      context.fill();
    };

    const startScratch = (event) => {
      event.preventDefault();
      if (isAnyCardScratched !== -1 && isAnyCardScratched !== id) {
        return;
      }
      isAnyCardScratched = id;
      isDragging = true;
      const { x, y } = getScratchCoordinates(event, canvas);
      scratch(x, y);
    };

    const continueScratch = (event) => {
      event.preventDefault();
      if (isDragging) {
        const { x, y } = getScratchCoordinates(event, canvas);
        scratch(x, y);
      }
    };

    const stopScratch = (event) => {
      event.preventDefault();
      isDragging = false;
    };

    canvas.addEventListener("mousedown", startScratch);
    canvas.addEventListener("mousemove", continueScratch);
    canvas.addEventListener("mouseup", stopScratch);
    canvas.addEventListener("mouseleave", stopScratch);

    canvas.addEventListener("touchstart", startScratch);
    canvas.addEventListener("touchmove", continueScratch);
    canvas.addEventListener("touchend", stopScratch);
    canvas.addEventListener("touchcancel", stopScratch);
  };

  canvases.forEach((canvas, index) => initCanvas(canvas, index));

  tickets.forEach((canvas, index) => initCanvasTicket(canvas, index));
};

document.addEventListener("DOMContentLoaded", scratchCards);
