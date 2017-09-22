<template>
  <div class="updated-confirmation">
    <div :class="classes">
      <div class="conf-alert_con">
        <span class="conf-alert_title" v-html="updateText"></span>
        <!--<a class="undo"><span>要撤消吗？</span></a>-->
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable default-case,no-case-declarations */

  const Ellipis = '<span>' +
    '<span class="loading-dot">.</span>' +
    '<span class="loading-dot">.</span>' +
    '<span class="loading-dot">.</span>' +
    '</span>'
  export default {
    props: {
      status: {
        type: String
      }
    },
    data () {
      return {
        updateClass: ''
//        updateText: ''
      }
    },
    computed: {
      classes () {
        return [
          'conf-alert',
          {
            'conf-alert--trashing': this.status === 'deleting',
            'conf-alert--updating': this.status === 'updating',
          }
        ]
      },
      updateText () {
        switch (this.status) {
          case 'trashing':
          case 'deleting':
            // s.deleting : s.trashing
            const trashText = this.status === 'deleting' ? '删除中' : '回收站'
//            this.updateClass += ' conf-aleart--trashing'
            return `<span> ${trashText} ${Ellipis} </span>`
          case 'updating':
            const updateText = '更新中'
            return `<span> ${updateText} ${Ellipis} </span>`
          case 'trash':
            break
          default:
            return 'trash'
        }
      }
    }
  }
</script>
