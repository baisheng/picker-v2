/* eslint-disable prefer-reflect,prefer-spread */
/*
*
* 文章数据状态
*
*/

export const state = () => {
  return {
    saving: false,
    episode: {
      status: '',
      del: '',
      creating: false,
      saving: false,
      deleting: false,
      id: 0,
      data: {
        id: 0
      }
    },
    episodeList: {
      fetching: false,
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
  DELETE_EPISODE (state) {
    state.episode.del = 'start'
  },
  DELETE_EPISODE_SUCCESS (state) {
    state.episode.del = 'success'
  },
  DELETE_EPISODE_FAILURE (state) {
    state.episode.del = 'error'
  },
  CREATE_EPISODE (state) {
    state.episode.creating = true
  },
  CREATE_EPISODE_SUCCESS (state, action) {
    state.episode.creating = true
    // console.log(action.data)
    state.episode.id = action.data
    // console.log(state.episode.id + '-----')
    // Object.assign(state.user, user);
  },
  CREATE_EPISODE_FAILURE (state) {
    state.episode.creating = false
  },
  CREATE_EPISODE_CANCEL (state) {
    state.episode.creating = false
  },

  REQUEST_EPISODE_LIST (state) {
    console.log('request episode list')
    state.episodeList.fetching = true
  },
  GET_EPISODELIST_FAILURE (state) {
    console.log('get episode list failure ')
    state.episodeList.fetching = false
  },
  GET_EPISODE_LIST_SUCCESS (state, action) {
    console.log('get episode list success ')
    state.episodeList.fetching = false
    state.episodeList.data = action.data
    // console.log(action.data)
  },
  UPDATE_EPISODE (state) {
    // state.detail.data = Object.assign({}, action.data)
    // state.detail.data = action.data
    state.episode.saving = true
  },
  UPDATE_EPISODE_SUCCESS (state, action) {
    state.episode.saving = false
    state.episode = Object.assign({}, action.data)
  },
  // UPDATE_ITEM (state) {
    // console.log('saving.. item')
    // state.saving = true
  // },
  // UPDATE_ITEM_SUCCESS (state) {
  //   console.log('saving.. success')
  //   state.item.saving = false
  // },
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
  UPDATE_DETAIL (state, action) {
    state.detail.data = Object.assign({}, action.data)
    // state.detail.data = action.data
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
    console.log(action.data)
    state.detail.data = action.data
  },

  // 喜欢某篇文章
  LIKE_ARTICLE (state, action) {
    const article = state.detail.data
    if (Object.is(article.id, action.id)) {
      state.detail.data.meta.likes++
    }
  }
}
