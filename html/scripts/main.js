'use strict';

(function ($) {
  var app = {
    init: function init() {
      app.windowResize();
      app.modals();
      app.menu();
      app.custom();
      app.fancybox();
      app.sliders();
      app.tabs();
      app.validate();
      app.accordeon();
      app.gsap();
    },

    windowResize: function windowResize() {
      $(window).on('resize', function () {});
    },

    windowLoad: function windowLoad() {
      $(window).on('load', function () {});
    },

    menu: function menu() {
      var $btnMenu = $('.jsMenu');
      $btnMenu.click(function () {
        $(this).toggleClass('menu-is-active');
        $('.b_header .right_part').slideToggle(200);
        $('body').toggleClass('menuopen');
      });

      $('.jsCloseMenu').on('click', function () {
        $('.b_header .right_part').slideUp(200);
        $('body').removeClass('menuopen');
      });
    },

    custom: function custom() {
      // $('.b_header').sticky({
      //   topSpacing: 0,
      //   zIndex: 20
      // });

      $.fn.isInViewportTopBottom = function () {
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();
        return elementBottom > viewportTop && elementTop < viewportBottom;
      };

      $(window).on('load resize scroll', function () {
        if ($('.jsCounter').length) {
          $('.jsCounter').each(function () {
            var $this = $(this),
                countTo = $this.attr('data-count');

            if ($this.isInViewportTopBottom() && !$this.hasClass('finished')) {
              $({ countNum: $this.text() }).animate({
                countNum: countTo
              }, {
                duration: 1500,
                easing: 'linear',
                step: function step() {
                  $this.addClass('finished');
                  $this.text(addCommas(Math.floor(this.countNum)));
                },
                complete: function complete() {
                  $this.addClass('finished');
                  $this.text(addCommas(this.countNum));
                }
              });
            }

            function addCommas(nStr) {
              return nStr.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
            }
          });
        }

        if ($('.os-animation').length) {
          $('.os-animation').each(function () {
            var $this = $(this);
            if ($this.isInViewportTopBottom() && !$this.hasClass('animated')) {
              $this.addClass('animate__animated animate__fadeInUp');
            }
          });
        }
      });

      var $mobile = false;
      $(window).on('ready resize load', function () {
        if ($(window).width() <= 768) {
          $mobile = true;
        } else {
          $mobile = false;
        }
      });

      $('.drop_menu_wrapper').each(function () {
        var $this = $(this),
            $thisBtn = $this.find('.jsDropMenuBtn'),
            $thisMenu = $this.find('.jsDropMenu');

        $thisBtn.on('click', function () {
          $thisMenu.fadeIn(200);
        });
        closeMenu($thisBtn, $thisMenu);
      });

      function closeMenu($thisBtn, $thisMenu) {
        $(document).on('click', function (e) {
          if (!$thisBtn.is(e.target) && $thisBtn.has(e.target).length === 0 && !$thisMenu.is(e.target) && $thisMenu.has(e.target).length === 0) {
            $thisMenu.fadeOut(200);
          }
        });
      }

      if ($('.txt-rotate').length) {
        // var words = $('#word').data('titles').split(',');
        // var i = 0;


        var TxtRotate = function TxtRotate(el, toRotate, period) {
          this.toRotate = toRotate;
          this.el = el;
          this.loopNum = 0;
          this.period = parseInt(period, 10) || 2000;
          this.txt = '';
          this.tick();
          this.isDeleting = false;
        };

        TxtRotate.prototype.tick = function () {
          var i = this.loopNum % this.toRotate.length;
          var fullTxt = this.toRotate[i];

          if (i == '0') {
            $(document).find('.txt-rotate').addClass('color');
          } else {
            $(document).find('.txt-rotate').removeClass('color');
          }

          if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
          } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
          }

          this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

          var that = this;
          var delta = 300 - Math.random() * 100;

          if (this.isDeleting) {
            delta /= 2;
          }

          if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
          } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
          }

          setTimeout(function () {
            that.tick();
          }, delta);
        };

        window.onload = function () {
          var elements = document.getElementsByClassName('txt-rotate');
          for (var i = 0; i < elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-rotate');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtRotate(elements[i], JSON.parse(toRotate), period);
            }
          }
          // INJECT CSS
          var css = document.createElement('style');
          css.type = 'text/css';
          css.innerHTML = '.txt-rotate > .wrap { border-right: 0.08em solid #fff }';
          document.body.appendChild(css);
        };

        // setInterval(function(){
        //   $('#word').fadeOut(function(){
        //     $(this).html(words[i=(i+1)%words.length]).fadeIn();
        //   });
        // }, 2000);
      }

      // gsap.registerPlugin(SplitText)

      // const titleList = gsap.utils.toArray('#titleEffects span')
      // const titlesTl = gsap.timeline({repeat: -1})

      // gsap.registerEffect({
      //   name: 'rotateIn',
      //   extendTimeline: true,
      //   defaults: {
      //     duration: 1,
      //     rotationY: 0,
      //     rotationX: 0,
      //     transformOrigin: '50% 50%',
      //     ease: 'back',
      //     parent: '.wrap',
      //   },

      //   effect: (targets, config) => {
      //     gsap.set(config.parent, { perspective: 800 })

      //     let tl = gsap.timeline()
      //     tl.from(targets, {
      //       duration: config.duration,
      //       rotationY: config.rotationY,
      //       rotationX: config.rotationX,
      //       transformOrigin: config.transformOrigin,
      //       ease: config.ease,
      //       stagger: {
      //         each: 0.06,
      //       },
      //     })

      //     tl.from(
      //       targets,
      //       {
      //         duration: 0.4,
      //         autoAlpha: 0,
      //         ease: 'none',
      //         stagger: {
      //           each: 0.05,
      //         },
      //       },
      //       0,
      //     )

      //     return tl
      //   },
      // })

      // gsap.registerEffect({
      //   name: 'rotateOut',
      //   extendTimeline: true,
      //   defaults: {
      //     duration: 0.5,
      //     x: 0,
      //     y: 0,
      //     rotationY: 0,
      //     rotationX: 0,
      //     rotationZ: 0,
      //     transformOrigin: '50% 50%',
      //     ease: 'power1.in',
      //     parent: '.wrap',
      //   },

      //   effect: (targets, config) => {
      //     gsap.set(config.parent, { perspective: 800 })

      //     let tl = gsap.timeline()
      //     tl.to(targets, {
      //       x: config.x,
      //       y: config.y,
      //       rotationY: config.rotationY,
      //       rotationX: config.rotationX,
      //       rotationZ: config.rotationZ,
      //       transformOrigin: config.transformOrigin,
      //       ease: config.ease,
      //       stagger: {
      //         each: 0.04,
      //       },
      //     })

      //     tl.to(
      //       targets,
      //       {
      //         duration: 0.45,
      //         opacity: 0,
      //         ease: 'none',
      //         stagger: {
      //           amount: 0.02,
      //         },
      //       },
      //       0,
      //     )

      //     return tl
      //   },
      // })

      // function splitElements() {
      //   gsap.set(titleList, { autoAlpha: 1 })
      //   // console.log(titleList);
      //   titleList.forEach((element, dex) => {

      //     // let split = new SplitText(element, { type: 'chars,words,lines' });
      //     // console.log(element.textContent);
      //     let split = element.textContent.split(' ');
      //     console.log(split);

      //     titlesTl
      //     .rotateIn(split, { 
      //       rotationX: 90,
      //       transformOrigin: '100% 0',
      //       ease: 'back(2.3)' 
      //     }, dex > 0 ? '-=0.38' : 0, )
      //     .rotateOut(split, {
      //       y: 20,
      //       rotationX: -100,
      //       transformOrigin: '100% 100%'
      //     })

      //   })
      // }

      // splitElements()


      if ($('.txt-array').length) {
        var animateText = function animateText() {
          var sentence = textArray[currentIndex];
          var letters = sentence.split('');
          textContainer.textContent = '';

          letters.forEach(function (letter, index) {

            var span = document.createElement('span');
            span.textContent = letter;
            span.style.opacity = 0;
            textContainer.appendChild(span);

            gsap.to(span, {
              opacity: 1,
              duration: 0.5,
              delay: index * 0.1,
              onStart: function onStart() {
                if (currentIndex == '0') {
                  $(document).find('.txt-array').addClass('color');
                } else {
                  $(document).find('.txt-array').removeClass('color');
                }
              },
              onComplete: function onComplete() {
                if (index === letters.length - 1) {
                  gsap.to('.txt-array span', {
                    opacity: 0,
                    duration: 0.5,
                    delay: 1.5,
                    stagger: 0.1,
                    onComplete: function onComplete() {
                      currentIndex = (currentIndex + 1) % textArray.length;
                      animateText();
                    }
                  });
                }
              }
            });
          });
        };

        var textArray = $('.txt-array').data('array');
        // console.log(textArray);

        // const textArray = ["creative crowd", "revolution", "creators", "platform"];
        var textContainer = document.querySelector('.txt-array');
        var currentIndex = 0;

        animateText();
      }
    },

    fancybox: function fancybox() {
      $('[data-fancybox]').fancybox({
        backFocus: false
      });
    },

    sliders: function sliders() {

      function initFloatSliders() {
        $('.images__slider.right').owlCarousel('destroy');
        $('.images__slider.left').owlCarousel('destroy');

        var owlLeft = $('.images__slider.left');
        var owlRight = $('.images__slider.right');

        setTimeout(function () {
          var ww = $(window).width();
          var itemsCount = ww / 150;

          owlLeft.owlCarousel({
            loop: true,
            animateIn: 'fadeIn',
            animateOut: 'fadeOut',
            responsiveClass: true,
            items: itemsCount,
            dots: false,
            nav: false,
            center: true,
            margin: 10,
            autoHeight: true,
            lazyLoad: true,
            mouseDrag: false,
            touchDrag: false,
            autoplay: true,
            slideTransition: 'linear',
            autoplayTimeout: 100,
            autoplaySpeed: 5000,
            autoplayHoverPause: false
          });

          owlRight.owlCarousel({
            rtl: true,
            loop: true,
            animateIn: 'fadeIn',
            animateOut: 'fadeOut',
            responsiveClass: true,
            items: itemsCount,
            dots: false,
            nav: false,
            center: true,
            margin: 10,
            autoHeight: true,
            lazyLoad: true,
            mouseDrag: false,
            touchDrag: false,
            autoplay: true,
            slideTransition: 'linear',
            autoplayTimeout: 100,
            autoplaySpeed: 2500,
            autoplayHoverPause: false
          });
        }, 100);

        setTimeout(function () {
          owlLeft.trigger('play.owl.autoplay', [5000]);
          owlRight.trigger('play.owl.autoplay', [2500]);
        }, 400);
      }

      initFloatSliders();

      $(window).resize(function () {
        initFloatSliders();
      });

      $('.jsProducingMedis').each(function () {
        var $this = $(this);

        $this.owlCarousel({
          // loop:true,
          margin: 0,
          nav: true,
          items: 1
        });
      });
    },

    modals: function modals() {},

    tabs: function tabs() {
      var tabs = $('.jsTabs');
      tabs.each(function () {
        var tabs = $(this),
            tab = tabs.find('.jsTabsTab'),
            content = tabs.find('.jsTabsItem');
        tab.each(function (index, element) {
          $(this).attr('data-tab', index);
        });

        function showContent(i) {
          tab.removeClass('-active');
          content.removeClass('-active').removeClass('-fade');
          tab.eq(i).addClass('-active');
          content.eq(i).addClass('-active');
          // setTimeout(function () {
          //   content.eq(i).addClass('-fade');
          // }, 1);
        }
        tab.on('click', function (e) {
          e.preventDefault();
          var $this = $(this);
          if (!$this.hasClass('-active')) {
            showContent(parseInt($(this).attr('data-tab')));
          }
        });
      });
    },

    validate: function validate() {},

    accordeon: function accordeon() {
      $('.jsAccord').each(function () {
        var accord = $(this),
            accord_btn = accord.find('.jsAccordBtn'),
            accord_content = accord.find('.jsAccordContent'),
            accord_item = accord.find('.jsAccordItem');

        accord_btn.on('click', function (e) {
          e.preventDefault();
          var $this = $(this),
              $this_item = $this.closest('.jsAccordItem'),
              $this_content = $this.closest('.jsAccordItem').find('.jsAccordContent');
          if ($this.hasClass('-active')) {
            $this.removeClass('-active');
            $this_content.slideUp();
            $this_item.removeClass('item_active');
          } else {
            accord_item.removeClass('item_active');
            accord_btn.removeClass('-active');
            accord_content.slideUp();
            $this.addClass('-active');
            $this_content.slideDown();
            $this_item.addClass('item_active');
          }
        });
      });
    },

    gsap: function (_gsap) {
      function gsap() {
        return _gsap.apply(this, arguments);
      }

      gsap.toString = function () {
        return _gsap.toString();
      };

      return gsap;
    }(function () {
      gsap.registerPlugin(ScrollTrigger, Observer);

      if ($('.jsRevolutionAnimation').length) {

        var $title1 = document.querySelector('.titles_list .title_1');
        var $title2 = document.querySelector('.titles_list .title_2');
        var $title3 = document.querySelector('.titles_list .title_3');

        var tl1 = gsap.timeline();
        tl1.to($title1, { opacity: 1, x: 0, duration: 1 }, 'step1').to('.circle_wrap_00', { top: '50%', left: '50%', x: '-50%', y: '-50%', scale: 7, duration: 1 }, 'step1').to('.circle_wrap_01', { opacity: 1, x: '0', duration: 1 }, 'step1');

        var tl2 = gsap.timeline();
        tl2.to($title2, { opacity: 1, x: 0, duration: 1 }, 'step2').to('.circle_wrap_01', { top: '50%', left: '50%', x: '-50%', y: '-50%', scale: 7, duration: 1 }, 'step2').to('.circle_wrap_02', { opacity: 1, x: '0', duration: 1 }, 'step2');

        var tl3 = gsap.timeline();
        tl3.to($title3, { opacity: 1, x: 0, duration: 1 }, 'step3').to('.circle_wrap_02', { top: '50%', left: '50%', x: '-50%', y: '-50%', scale: 7, duration: 1 }, 'step3').to('.circle_wrap_03', { opacity: 1, x: '0', duration: 1 }, 'step3');

        var tl4 = gsap.timeline();
        tl4.from('.b_revolution .bottom_content', { opacity: 0, y: 100, duration: 1 }, 'step4').to('.circle_wrap_03', { top: '50%', left: '50%', x: '-50%', y: '-50%', scale: 7, duration: 1 }, 'step4').to('.circle_wrap_04', { opacity: 1, x: '0', duration: 1 }, 'step4');

        var masterTL = gsap.timeline({
          onReverseComplete: function onReverseComplete() {
            _scrollObserver.disable();
            _sectionST.scroll(_sectionST.start);
          },
          onComplete: function onComplete() {
            _scrollObserver.disable();
            _sectionST.scroll(_sectionST.end);
          },
          paused: true
        });

        masterTL.add(tl1, 'label1').addPause().add(tl2, 'label2').addPause().add(tl3, 'label3').addPause().add(tl4, 'label4');

        var _scrollObserver = Observer.create({
          type: 'wheel,touch',
          wheelSpeed: -1,
          debounce: false,
          dragMinimum: 2,
          preventDefault: true,
          onUp: function onUp() {
            return masterTL.play();
          },
          onDown: function onDown() {
            return masterTL.reverse();
          },
          onEnable: function onEnable(self) {
            var savedScroll = self.scrollY();
            self._restoreScroll = function (e) {
              return self.scrollY(savedScroll);
            };
            document.addEventListener('scroll', self._restoreScroll, { passive: false });
          },
          onDisable: function onDisable(self) {
            document.removeEventListener('scroll', self._restoreScroll);
          }
        });
        _scrollObserver.disable();

        var _sectionST = ScrollTrigger.create({
          trigger: '.jsRevolutionAnimation',
          start: 'top top',
          end: '+=300',
          onEnter: function onEnter(self) {
            self.scroll(self.start + 1);
            masterTL.progress() < 1 && _scrollObserver.enable();
          },
          onEnterBack: function onEnterBack(self) {
            self.scroll(self.end - 1);
            masterTL.progress() > 0 && _scrollObserver.enable();
          },
          onLeave: function onLeave() {
            return _scrollObserver.disable();
          },
          onLeaveBack: function onLeaveBack() {
            return _scrollObserver.disable();
          },
          // markers: true,
          pin: true
        });
      }
    })

  };

  $(document).ready(app.init());

  app.windowLoad();
})(jQuery);