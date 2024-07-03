<template>
  <div class="member-item">
    <div class="member-item-box">
      <div class="item-line">
        <div class="item-title">月会员</div>
      </div>
      <div class="item-price">￥29元</div>
      <div class="item-btn">立即购买</div>
    </div>
    <ul class="member-desc-list">
      <li class="member-desc-item">
        <div class="icon-item">
          <img src="" alt="" />
        </div>
        <div class="item-desc">
          <div class="item-title">解锁全部功能</div>
          <div class="item-desc">配置更便携更搞笑</div>
        </div>
      </li>
      <li class="member-desc-item">
        <div class="icon-item">
          <img src="" alt="" />
        </div>
        <div class="item-desc">
          <div class="item-title">解锁全部功能</div>
          <div class="item-desc">配置更便携更搞笑</div>
        </div>
      </li>
      <li class="member-desc-item">
        <div class="icon-item">
          <img src="" alt="" />
        </div>
        <div class="item-desc">
          <div class="item-title">解锁全部功能</div>
          <div class="item-desc">配置更便携更搞笑</div>
        </div>
      </li>
      <li class="member-desc-item">
        <div class="icon-item">
          <img src="" alt="" />
        </div>
        <div class="item-desc">
          <div class="item-title">解锁全部功能</div>
          <div class="item-desc">配置更便携更搞笑</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.member-item {
  .member-item-box {
    border: 2px solid #333;
    margin-bottom: 20px;
    margin-top: 20px;
    border-radius: 5px;

    .item-line {
      border-bottom: 2px solid #333;

      .item-title {
        margin: 10px 20px;
        font-size: 18px;
        font-weight: 400;
      }
    }

    .item-price {
      margin: 0 20px;
      font-size: 24px;
      font-weight: 400;
      margin-top: 10px;
    }

    .item-btn {
      margin: 0 20px;
      margin-top: 10px;
      color: #fff;
      background-color: #c78067;
      padding: 10px 15px;
      text-align: center;
      margin-bottom: 20px;
    }
  }

  .member-desc-list {
    .member-desc-item {
      display: flex;
      margin-bottom: 15px;

      .icon-item {
        width: 32px;
        height: 32px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .item-desc {
        margin-left: 10px;

        .item-title {
          font-size: 16px;
        }

        .item-desc {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
