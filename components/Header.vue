<template>
  <div class="header__bg">
    <div class="games__slider">
      <div style="width: 100%; display: inline-block;">
        <div class="games-slider__parent">
          <div class="games-slider__child"></div>
        </div>
      </div>
      <div class="container">
        <div class="games-slider__content">
          <h4>Gamers This Is For You</h4>

          <h3>Built for true gaming lovers</h3>

          <h5>Built for gamers, eSports fans, game fans &amp; true gaming lovers</h5>

          <a href class="btn btn-orange" tabindex="0">BUY GAMES</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style lang="scss">
.header__bg {
  color: #fff;

  h3 {
    font-size: 44px;
    margin: 0px 0px 20px;
  }

  h4 {
    color: $theme;
    font-size: 21px;
  }

  h5 {
    color: #b7b9bd;
    font-weight: 400;
    font-size: 20px;
    margin-bottom: 45px;
  }
}

.games__slider {
  position: relative;
}

.games-slider__parent {
  width: 100%;
  height: 600px;
  overflow: hidden;
}

.games-slider__child {
  width: 100%;
  height: 100%;
  background-color: black; /* fallback color */
  background-image: url("https://damido.sk/themes/games/assets/img/games-bg.jpg");
  background-position: center;
  background-size: cover;

  background-size: auto;
  background-repeat: repeat;
  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-animation: zoomin 25s ease-in infinite;
  animation: zoomin 25s ease-in infinite;
  transition: all 1s ease-in-out;
  overflow: hidden;
}

@-webkit-keyframes zoomin {
  0% {
    transform: scale(1.2);
  }
  50% {
    transform: scale(1.4);
  }
  100% {
    transform: scale(1.4);
  }
}
@keyframes zoomin {
  0% {
    transform: scale(1.2);
  }
  50% {
    transform: scale(1.4);
  }
  100% {
    transform: scale(1.2);
  }
}

.games-slider__content {
  position: absolute;
  top: -18px;
  height: 100%;
  display: flex;
  align-items: center;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
}
</style>