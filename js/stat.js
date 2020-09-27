`use strict`;

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const CLOUD_X = 100;
const CLOUD_Y = 10;

const GAP = 10;
const BAR_WIDTH = 40;
const BAR_GAP = 50;
const BAR_HEIGHT = 150;
const BAR_Y = 240;


let renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

let getMaxElement = function (arr) {
  let maxElement = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(
      ctx,
      CLOUD_X + GAP,
      CLOUD_Y + GAP,
      `rgba(0, 0, 0, 0.7)`
  );
  renderCloud(
      ctx,
      CLOUD_X,
      CLOUD_Y,
      `#fff`
  );

  ctx.font = `16px PT Mono`;
  ctx.fillStyle = `black`;
  ctx.fillText(
      `Ура, вы победили!`,
      CLOUD_X + GAP * 2,
      CLOUD_Y + GAP * 3
  );
  ctx.fillText(
      `Список результатов:`,
      CLOUD_X + GAP * 2,
      CLOUD_Y + GAP * 5
  );

  let maxTime = getMaxElement(times);

  for (let i = 0; i <= names.length - 1; i++) {
    ctx.fillStyle = `black`;
    ctx.fillText(
        names[i],
        CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i,
        BAR_Y + GAP * 2
    );

    ctx.fillText(
        Math.round((BAR_HEIGHT*times[i])/maxTime),
        CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i,
        GAP * 8 + BAR_HEIGHT -(BAR_HEIGHT*times[i]) / maxTime
    );

    ctx.fillStyle = (names[i] == `Вы`) ?
      `rgba(255, 0, 0, 1)` :
      `hsl(225, 80%, ${Math.round(Math.random() * 100)}%)`;

    ctx.fillRect(
        CLOUD_X + BAR_GAP + (BAR_GAP + BAR_WIDTH) * i,
        BAR_Y,
        BAR_WIDTH,
        -(BAR_HEIGHT * times[i]) / maxTime
    );
  }
};
