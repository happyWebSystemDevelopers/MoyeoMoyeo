
import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../view/Main.vue'
import Free from '../view/FreeBoard.vue'
import Gathering from '../view/GatheringBoard.vue'
import Cultural from '../view/CulturalEvent.vue'
import Search from '../view/SearchFriend.vue'
import Intro from '../view/Intro.vue'
import FreeDetail from '../view/freeBoardDetail.vue'
import writeFreeBoard from '../view/WriteFreeBoard'
import GatheringDetail from '../view/GatheringBoardDetail.vue'
import EventDetail from '../view/CulturalEvnentDetail'
import modifyFreeBoard from '../view/ModifyFreeBoard'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main
  },
  {
    path: '/freeboard',
    name: 'free',
    component: Free
  },
  {
    path: '/gathering',
    name: 'gathering',
    component: Gathering
  },
  {
    path: '/cultural',
    name: 'cultural',
    component: Cultural
  },
  {
    path: '/search',
    name: 'search',
    component: Search
  },
  {
    path: '/intro',
    name: 'intro',
    component: Intro
  },
  {
    path : '/freeboard/:idx',
    name : 'freeBoardDetail',
    component : FreeDetail
  },
  {
    path : '/writefreeboard',
    name : 'writeFreeBoard',
    component : writeFreeBoard,
  },
  {
    path : '/gatheringboard/:idx',
    name : 'gatheringBoardDetail',
    component : GatheringDetail,
  },
  {
    path : '/cultural/:idx',
    name : 'culturalEventDetail',
    component : EventDetail
  },
  {
    path : '/modifyfreeboard/:idx',
    name : 'modifyFreeBoard',
    component : modifyFreeBoard,
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
