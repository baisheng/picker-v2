<template>
    <span data-reactroot=""><!-- react-empty: 2 -->
      <div class="flow-progress-indicator flow-progress-indicator__main">第 1 步（共 3 步）</div>
      <span
        class="signup__steps">
        <div class="signup__step">
          <div class="design-type">
            <div class="step-wrapper">
              <header class="formatted-header">
                <h1 class="formatted-header__title">您好！开始打造您的新业务应用吧。</h1>
                <p class="formatted-header__subtitle">您需要何种类型的应用？在下方选择一项：</p>
              </header>
              <div class="step-wrapper__content is-animated-content">
                <div class="design-type__list">
                  <a href="#blog"
                     class="card design-type__choice is-card-link">
                    <svg
                      class="gridicon gridicons-chevron-right card__link-indicator" height="24" width="24"
                      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path
                      d="M10 20l8-8-8-8-1.414 1.414L15.172 12l-6.586 6.586"></path></g></svg><div
                    class="design-type__choice-image">
                    <img
                      src="/images/illustrations/type-blog.svg"></div>
                    <div class="design-type__choice-copy"><span
                      class="button is-compact design-type__cta">小程序应用</span>
                      <p class="design-type__choice-description">用于代管理并建立微信小程序。</p>
                    </div>
                  </a>
                  <a href="#page"
                     class="card design-type__choice is-card-link">
                    <svg
                      class="gridicon gridicons-chevron-right card__link-indicator" height="24" width="24"
                      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path
                      d="M10 20l8-8-8-8-1.414 1.414L15.172 12l-6.586 6.586"></path></g></svg>
                    <div
                      class="design-type__choice-image"><img
                      src="/images/illustrations/type-website.svg">
                    </div>
                    <div class="design-type__choice-copy">
                      <span
                        class="button is-compact design-type__cta">网站应用</span>
                      <p class="design-type__choice-description">用于推广您的业务、组织或品牌，并与您的用户建立联系。</p>
                    </div>
                  </a>
                  <a href="#grid" class="card design-type__choice is-card-link">
                    <svg
                      class="gridicon gridicons-chevron-right card__link-indicator" height="24" width="24"
                      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path
                      d="M10 20l8-8-8-8-1.414 1.414L15.172 12l-6.586 6.586"></path></g></svg><div
                    class="design-type__choice-image">
                    <img src="/images/illustrations/type-portfolio.svg">
                  </div>
                    <div class="design-type__choice-copy">
                      <span
                        class="button is-compact design-type__cta">内容管理</span><p
                      class="design-type__choice-description">用于生产和管理内容。</p>
                    </div>
                  </a>
                  <div class="design-type__choice is-spacergif"></div>
                  <p class="design-type__disclaimer">尚不确定？<a href="/apps">咨询我们  </a> <icon name="commenting" class="gridicon" style="margin-right: 5px;"></icon>进行专业的业务规划。</p></div>
                <div class="step-wrapper__buttons">
              </div>
              </div>
            </div>
          </div>
        </div>
      </span>
    </span>
</template>
<script>
  export default {
    layout: 'start',
  }
</script>
