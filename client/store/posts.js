/* eslint-disable prefer-reflect,prefer-spread */
/*
*
* 文章数据状态
*
*/
export const state = () => {
  return {
    creating: false,
    saving: false,
    post: {
      status: '',
      del: '',
      creating: false,
      saving: false,
      deleting: false,
      data: {
        id: 0
      }
    },
    item: {
      creating: false,
      saving: false,
      data: {}
    },
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
  SET_POST (state, post) {
    state.post = post
  },
  DELETE (state) {
    state.post.del = 'start'
  },
  DELETE_SUCCESS (state) {
    state.post.del = 'success'
  },
  DELETE_FAILURE (state) {
    state.post.del = 'error'
  },
  CREATE (state) {
    state.post.creating = true
  },
  CREATE_SUCCESS (state, action) {
    // state.post.creating = true
    state.post.data.id = action.data
    // Object.assign(state.user, user);
  },
  CREATE_FAILURE (state) {
    state.post.creating = false
  },
  CREATE_CANCEL (state) {
    state.post.creating = false
  },
  UPDATE_ITEM (state) {
    // console.log('saving.. item')
    state.saving = true
  },
  UPDATE_ITEM_SUCCESS (state) {
    // console.log('saving.. success')
    state.item.saving = false
  },
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
  UPLOAD_FEATURED_IMAGE (state) {
  },
  REQUEST_LIST (state) {
    // console.log('request Posts list')
    state.list.fetching = true
  },
  GET_LIST_FAILURE (state) {
    // console.log('get article listfailure ')
    state.list.fetching = false
  },
  GET_LIST_SUCCESS (state, action) {
    // console.log('Get Posts list success ')
    state.list.fetching = false
    state.list.data = action.data
    // console.log(action.data)
  },
  ADD_LIST_SUCCESS (state, action) {
    state.list.fetching = false
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
