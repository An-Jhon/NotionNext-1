// import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import Typed from 'typed.js'
import CONFIG_HEXO from '../config_hexo'
import NavButtonGroup from './NavButtonGroup'
import throttle from 'lodash.throttle'

let wrapperTop = 0
let windowTop = 0
let autoScroll = false
const enableAutoScroll = false // 是否开启自动吸附滚动

/**
 *
 * @returns 头图
 */
const Header = props => {
  const [typed, changeType] = useState()
  const { siteInfo } = props
  useEffect(() => {
    updateHeaderHeight()

    if (!typed && window && document.getElementById('typed')) {
      changeType(
        new Typed('#typed', {
          strings: CONFIG_HEXO.HOME_BANNER_GREETINGS,
          typeSpeed: 200,
          backSpeed: 100,
          backDelay: 400,
          showCursor: true,
          smartBackspace: true
        })
      )
    }

    if (enableAutoScroll) {
      scrollTrigger()
      window.addEventListener('scroll', scrollTrigger)
    }

    window.addEventListener('resize', updateHeaderHeight)
    return () => {
      if (enableAutoScroll) {
        window.removeEventListener('scroll', scrollTrigger)
      }
      window.removeEventListener('resize', updateHeaderHeight)
    }
  })

  function updateHeaderHeight() {
    requestAnimationFrame(() => {
      const wrapperElement = document.getElementById('wrapper')
      wrapperTop = wrapperElement?.offsetTop
    })
  }

  const autoScrollEnd = () => {
    if (autoScroll) {
      windowTop = window.scrollY
      autoScroll = false
    }
  }
  const throttleMs = 200
  const scrollTrigger = useCallback(throttle(() => {
    if (screen.width <= 768) {
      return
    }

    const scrollS = window.scrollY
    // 自动滚动
    if ((scrollS > windowTop) & (scrollS < window.innerHeight) && !autoScroll
    ) {
      autoScroll = true
      window.scrollTo({ top: wrapperTop, behavior: 'smooth' })
      autoScrollEnd()
    }
    if ((scrollS < windowTop) && (scrollS < window.innerHeight) && !autoScroll) {
      autoScroll = true
      window.scrollTo({ top: 0, behavior: 'smooth' })
      autoScrollEnd()
    }
    windowTop = scrollS
  }, throttleMs))

  return (
<<<<<<< HEAD
        <header id="header" style={{ zIndex: 1 }} className="w-full h-screen relative" >
=======
    <header
      id="header"
      className="duration-500 md:bg-fixed w-full bg-cover bg-center h-screen bg-black text-white relative z-10"
      style={{
        backgroundImage:
          `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0,0,0,0.1), rgba(0,0,0,0.0), rgba(0,0,0,0.1), rgba(0, 0, 0, 0.2) ),url("${siteInfo?.pageCover}")`
      }}
    >
      <div className="absolute flex flex-col h-full items-center justify-center w-full ">
        <div className='text-4xl md:text-5xl text-white shadow-text'>{siteInfo?.title}</div>
        <div className='mt-2 h-12 items-center text-center shadow-text text-white text-lg'>
          <span id='typed'/>
        </div>
>>>>>>> main

            <div id='header-cover' style={{ backgroundImage: `url('${siteInfo.pageCover}')` }}
                className={`header-cover bg-center w-full h-screen bg-cover ${CONFIG_HEXO.HOME_NAV_BACKGROUND_IMG_FIXED ? 'bg-fixed' : ''}`}/>

            <div className="text-white absolute bottom-0 flex flex-col h-full items-center justify-center w-full ">
                <div className='text-4xl md:text-5xl shadow-text'>{siteInfo?.title}</div>
                <div className='mt-2 h-12 items-center text-center shadow-text text-lg'>
                    <span id='typed' />
                </div>

                {/* 首页导航插件 */}
                {CONFIG_HEXO.HOME_NAV_BUTTONS && <NavButtonGroup {...props} />}

            </div>

            <div
                onClick={() => { window.scrollTo({ top: wrapperTop, behavior: 'smooth' }) }}
                className="cursor-pointer w-full text-center py-4 text-3xl absolute bottom-10 text-white"
            >
                <i className='animate-bounce fas fa-angle-down' />
            </div>
        </header>
  )
}

export default Header