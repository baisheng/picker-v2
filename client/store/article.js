/* eslint-disable prefer-spread */
/*
*
* 文章数据状态
*
*/

export const state = () => {
  return {
    hot: {
      fetching: false,
      data: { data: [] }
    },
    list: {
      fetching: false,
      data: {
        'count': 0,
        'totalPages': 0,
        'pagesize': 10,
        'currentPage': 1,
        'data': []
      }
    },
    detail: {
      fetching: false,
      data: {}
    }
  }
}

export const mutations = {

  // List
  CLEAR_LIST (state) {
    state.list.data = {
      result: {
        pagination: {
          current_page: 0
        },
        data: []
      }
    }
  },
  REQUEST_LIST (state) {
    console.log('request article list')
    state.list.fetching = true
  },
  GET_LIST_FAILURE (state) {
    console.log('get article listfailure ')
    state.list.fetching = false
  },
  GET_LIST_SUCCESS (state, action) {
    console.log('get article list success ')
    state.list.fetching = false
    state.list.data = action.data
    // console.log(action.data)
  },
  ADD_LIST_SUCCESS (state, action) {
    state.list.fetching = false
    /*eslint prefer-reflect: ["error", { "exceptions": ["apply"] }]*/
    state.list.data.data.push.apply(state.list.data.data, action.result.data)
    state.list.data.pagination = action.result.pagination
  },

  // Hot
  REQUEST_HOT_LIST (state) {
    state.hot.fetching = true
  },
  GET_HOT_LIST_FAILURE (state) {
    state.hot.fetching = false
  },
  GET_HOT_LIST_SUCCESS (state, action) {
    state.hot.fetching = false
    state.hot.data = action.result
  },

  // Detail
  CLEAR_DETAIL (state) {
    state.detail.data = {}
  },
  REQUEST_DETAIL (state) {
    state.detail.fetching = true
  },
  GET_DETAIL_FAILURE (state) {
    state.detail.fetching = false
    state.detail.data = {}
  },
  GET_DETAIL_SUCCESS (state, action) {
    state.detail.fetching = false
    state.detail.data = action.result
  },

  // 喜欢某篇文章
  LIKE_ARTICLE (state, action) {
    const article = state.detail.data
    if (Object.is(article.id, action.id)) {
      state.detail.data.meta.likes++
    }
  }
}
