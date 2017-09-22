<template>
  <main data-reactroot="" class="invite-people main" role="main">
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
        <h1 class="current-section__section-title">邀请用户</h1></div>
    </a>
    </header>
    <div class="card header-cake is-compact">
      <button class="button header-cake__back is-compact is-borderless" type="button">
        <svg class="gridicon gridicons-arrow-left needs-offset-y" height="18" width="18"
             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g>
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
          </g>
        </svg>
        返回
      </button>
      <div class="header-cake__title">邀请用户</div>
      <button class="button header-cake__back is-spacer is-compact is-borderless" disabled="" type="button">
        <svg class="gridicon gridicons-arrow-left needs-offset-y" height="18" width="18"
             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g>
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
          </g>
        </svg>
        返回
      </button>
    </div>
    <div class="card">
      <div>
        <form>
          <div role="group" class="invite-people__token-field-wrapper"><label class="form-label">
            <!-- react-text: 161 -->用户名或邮箱<!-- /react-text --></label>
            <div class="token-field" tabindex="-1">
              <div class="token-field__input-container" tabindex="-1"><input type="text" autocapitalize="none"
                                                                             autocomplete="off" value="" placeholder=""
                                                                             size="1" class="token-field__input"></div>
              <ul class="token-field__suggestions-list" tabindex="-1"></ul>
            </div>
            <p class="form-setting-explanation"></p></div>
          <fieldset class="form-fieldset"><!-- react-empty: 168 --><!-- react-empty: 169 --><label for="role"
                                                                                                   class="form-label">
            <!-- react-text: 171 -->身份<!-- /react-text --></label><select id="role" name="role" class="form-select">
            <option value="administrator">管理员</option>
            <option value="editor">编辑</option>
            <option value="author">作者</option>
            <option value="contributor">贡献者</option>
            <option value="follower">微信粉丝</option>
          </select>
            <p class="form-setting-explanation"><a target="_blank" rel="noopener noreferrer"
                                                   href="http://en.support.wordpress.com/user-roles/">了解更多关于角色的信息</a>
            </p></fieldset>
          <fieldset class="form-fieldset"><label for="message" class="form-label"><!-- react-text: 182 -->自定义消息
            <!-- /react-text --></label>
            <div class="counted-textarea"><textarea name="message" id="message" maxlength="500" placeholder=""
                                                    class="counted-textarea__input form-textarea"></textarea>
              <div class="counted-textarea__count-panel"><!-- react-text: 186 -->500 characters remaining
                <!-- /react-text --></div>
            </div>
            <p class="form-setting-explanation">（可选）您最多可以在用户邀请函中输入 500 个字符的自定义消息。</p></fieldset>
          <button disabled="" type="submit" class="button form-button is-primary">发送邀请</button>
        </form>
      </div>
    </div>
  </main>
</template>
