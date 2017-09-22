<template>
  <main data-reactroot="" class="main" role="main">
    <header class="current-section"><a>
      <svg class="gridicon gridicons-chevron-left" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 24 24">
        <g>
          <path d="M14 20l-8-8 8-8 1.414 1.414L8.828 12l6.586 6.586"></path>
        </g>
      </svg>
      <div class="site-icon is-blank" style="height: 32px; width: 32px; line-height: 32px; font-size: 32px;">
        <svg class="gridicon gridicons-globe" height="25" width="25" xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 24 24">
          <g>
            <path
              d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18l2-2 1-1v-2h-2v-1l-1-1H9v3l2 2v1.93c-3.94-.494-7-3.858-7-7.93l1 1h2v-2h2l3-3V6h-2L9 5v-.41C9.927 4.21 10.94 4 12 4s2.073.212 3 .59V6l-1 1v2l1 1 3.13-3.13c.752.897 1.304 1.964 1.606 3.13H18l-2 2v2l1 1h2l.286.286C18.03 18.06 15.24 20 12 20z"></path>
          </g>
        </svg>
      </div>
      <div><p class="current-section__site-title">bluepx</p>
        <h1 class="current-section__section-title">人员</h1></div>
    </a></header>
    <div>
      <div class="section-nav has-pinned-items">
        <div class="section-nav__mobile-header"><span class="section-nav__mobile-header-text">团队</span></div>
        <div class="section-nav__panel">
          <div class="section-nav-group">
            <div class="section-nav-tabs">
              <ul class="section-nav-tabs__list" role="menu">
                <li class="is-selected section-nav-tab"><a href="/people/team"
                                                           class="section-nav-tab__link" tabindex="0"
                                                           aria-selected="true" role="menuitem"><span
                  class="section-nav-tab__text"><!-- react-text: 4200 -->团队<!-- /react-text --></span></a></li>
                <li class="section-nav-tab">
                  <a href="/people/followers"
                                               class="section-nav-tab__link" tabindex="0" aria-selected="false"
                                               role="menuitem"><span class="section-nav-tab__text"><!-- react-text: 4204 -->粉丝
                  <!-- /react-text --></span></a>
                </li>
                <li class="section-nav-tab">
                  <a href="/people/email-followers"
                                               class="section-nav-tab__link" tabindex="0" aria-selected="false"
                                               role="menuitem"><span class="section-nav-tab__text"><!-- react-text: 4208 -->向粉丝发送电子邮件
                  </span></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="is-expanded-to-container has-open-icon search" role="search">
            <div class="spinner" style="">
              <svg class="spinner__image" width="20" height="20" viewBox="0 0 100 100">
                <defs>
                  <mask id="maskBorder17">
                    <rect x="0" y="0" width="100%" height="100%" fill="white"></rect>
                    <circle r="46%" cx="50%" cy="50%" fill="black"></circle>
                  </mask>
                  <mask id="maskDonut17">
                    <rect x="0" y="0" width="100%" height="100%" fill="black"></rect>
                    <circle r="46%" cx="50%" cy="50%" fill="white"></circle>
                    <circle r="30%" cx="50%" cy="50%" fill="black"></circle>
                  </mask>
                  <mask id="maskLeft17">
                    <rect x="0" y="0" width="50%" height="100%" fill="white"></rect>
                  </mask>
                  <mask id="maskRight17">
                    <rect x="50%" y="0" width="50%" height="100%" fill="white"></rect>
                  </mask>
                </defs>
                <circle class="spinner__border" r="50%" cx="50%" cy="50%" mask="url( #maskBorder17 )"></circle>
                <g mask="url( #maskDonut17 )">
                  <g mask="url( #maskLeft17 )">
                    <rect class="spinner__progress is-left" x="0" y="0" width="50%" height="100%"></rect>
                  </g>
                  <g mask="url( #maskRight17 )">
                    <rect class="spinner__progress is-right" x="50%" y="0" width="50%" height="100%"></rect>
                  </g>
                </g>
              </svg>
            </div>
            <div class="search__icon-navigation" tabindex="0" aria-controls="search-component-8" aria-label="打开“搜索”">
              <svg class="gridicon gridicons-search search__open-icon" height="24" width="24"
                   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g>
                  <path
                    d="M21 19l-5.154-5.154C16.574 12.742 17 11.42 17 10c0-3.866-3.134-7-7-7s-7 3.134-7 7 3.134 7 7 7c1.42 0 2.742-.426 3.846-1.154L19 21l2-2zM5 10c0-2.757 2.243-5 5-5s5 2.243 5 5-2.243 5-5 5-5-2.243-5-5z"></path>
                </g>
              </svg>
            </div>
            <div class="search__input-fade"><input type="search" id="search-component-8" class="search__input"
                                                   placeholder="搜索…" role="search" value="" aria-label="搜索"
                                                   aria-hidden="true" autocapitalize="none"></div>
          </div>
        </div>
      </div><!-- react-empty: 4219 -->
      <div>
        <div class="card people-list-section-header section-header is-compact">
          <div class="section-header__label">
            <span class="section-header__label-text">团队</span><span
            class="count">2</span></div>

          <div class="section-header__actions"><span class="button-group">
            <a href="/people/new"
                                                                             class="button people-list-section-header__add-button is-compact"
                                                                             aria-label="邀请用户"><svg
            class="gridicon gridicons-plus-small needs-offset" height="18" width="18" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"><g><path d="M18 11h-5V6h-2v5H6v2h5v5h2v-5h5"></path></g></svg><svg
            class="gridicon gridicons-user" height="18" width="18" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"><g><path
            d="M12 4c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm0 16s8 0 8-2c0-2.4-3.9-5-8-5s-8 2.6-8 5c0 2 8 2 8 2z"></path></g></svg>
            <!-- react-empty: 4306 --></a></span></div>
        </div>
        <div class="card">
          <div class="people-selector__infinite-list">
            <div class="infinite-list__spacer" style="height: 0px;"></div>
            <a type="user" class="card people-list-item is-compact is-card-link"
               href="/people/edit/">
              <svg class="gridicon gridicons-chevron-right card__link-indicator" height="24" width="24"
                   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g>
                  <path d="M10 20l8-8-8-8-1.414 1.414L15.172 12l-6.586 6.586"></path>
                </g>
              </svg>
              <div class="people-list-item__profile-container">
                <div class="people-profile">
                  <div class="people-profile__gravatar">
                    <img class="gravatar"
                         src="https://0.gravatar.com/avatar/f0fd64a8a2dd79ec5f4f1e363585a143?s=96&amp;d=mm&amp;r=G"
                         width="72" height="72"></div>
                  <div class="people-profile__detail">
                    <div class="people-profile__username">bluepx</div>
                    <div class="people-profile__login"><span><!-- react-text: 4284 -->@<!-- /react-text -->
                      <!-- react-text: 4285 -->bluepx<!-- /react-text --></span></div>
                    <div class="people-profile__badges">
                      <div class="people-profile__role-badge role-administrator">管理员</div>
                    </div>
                  </div>
                </div>
              </div>
            </a><a type="user" class="card people-list-item is-compact is-card-link"
                   href="/people/edit">
            <svg class="gridicon gridicons-chevron-right card__link-indicator" height="24" width="24"
                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g>
                <path d="M10 20l8-8-8-8-1.414 1.414L15.172 12l-6.586 6.586"></path>
              </g>
            </svg>
            <div class="people-list-item__profile-container">
              <div class="people-profile">
                <div class="people-profile__gravatar">
                  <img class="gravatar"
                       src="https://0.gravatar.com/avatar/c70717b364382b59d33ede55f09e242b?s=96&amp;d=mm&amp;r=G"
                       width="72" height="72"></div>
                <div class="people-profile__detail">
                  <div class="people-profile__username">deadline</div>
                  <div class="people-profile__login"><span><!-- react-text: 4300 -->@<!-- /react-text -->
                    <!-- react-text: 4301 -->deadline<!-- /react-text --></span></div>
                  <div class="people-profile__badges">
                    <div class="people-profile__role-badge role-editor">编辑</div>
                  </div>
                </div>
              </div>
            </div>
          </a>
            <div class="infinite-list__spacer" style="height: 0px;"></div>
          </div>
        </div>
        <div class="list-end"></div>
      </div>
    </div>
  </main>
</template>
