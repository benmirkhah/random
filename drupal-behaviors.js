(function ($) {

  dbfSmoothScroll = {
    attach: function (context, settings) {
      $('.l-content a[href*=#]:not([href=#]):not(.colorbox-inline)').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top
            }, 1000);
            return false;
          }
        }
      });
    }
  };

  dbfBodyWidthClass = {
    attach: function (context, settings) {
      var $window = $(window),
          $html   = $('html');

      $window.resize(function resize() { //List from smallest to largest
        $html.removeClass('phone');
        $html.removeClass('phablet');
        $html.removeClass('tablet');
        $html.removeClass('desktop');

        if ($window.width() < 725)  { return $html.addClass('phone'  ); }
        if ($window.width() < 980)  { return $html.addClass('phablet'); }
        if ($window.width() < 1170) { return $html.addClass('tablet' ); }
        else {                        return $html.addClass('desktop'); }
      }).trigger('resize');
    }
  };

  dbfDetectSVG = {
    attach: function (context, settings) {
      if (document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1")) {
        document.documentElement.className += " svg";
      }
    }
  };

  dbfMenuDropdownToggler = {
    attach: function (context, settings) {
      var $BlockSystemMainMenu = $('#block-system-main-menu');
      $BlockSystemMainMenu.once('dropped', function () {
        $BlockSystemMainMenu.find('ul li.first a').click(function (e) {
          e.preventDefault();
          junk = e.defaultPrevented;
          if ($BlockSystemMainMenu.hasClass('isopen')) { //Close self if already open
            $BlockSystemMainMenu.removeClass('isopen');
          } else {
            $BlockSystemMainMenu.addClass('isopen'); //Open if not open
          }
        });
      });
    }
  };

  dbfSearchTrigger = {
    attach: function (context, settings) {
      $('#search-trigger').add('#search-close').add(".l-nav-drop ul.menu li.search a").once('searched', function () {
        $(this).click(function (e) {
          e.preventDefault();
          junk = e.defaultPrevented;
          if ($('#search-bar').hasClass('isopen')) { //Close self if already open
            $('#search-bar').removeClass('isopen');
            $(this).removeClass('isopen'); //brighten the icon
            document.documentElement.classList.remove('search-open');
          } else {
            $('#search-bar').addClass('isopen'); //Open if not open
            $(this).addClass('isopen'); //gray the icon
            document.documentElement.className += " search-open";
          }
        });
      });
    }
  };

  dbfEmergeMenuTrigger = {
    attach: function (context, settings) {
      var hamburger  = '.hamburger';
      var dropdown   = '.l-nav-drop-region';
      var navmenu    = '.l-nav-drop .menu-wrapper > ul.menu';
      var $hamburger = $(hamburger);
      var $dropdown  = $(dropdown);
      var $navmenu   = $(navmenu);

      $('body').once('emtrigger', function () {
        $hamburger.click(function (e) {
          e.preventDefault();
          junk = e.defaultPrevented;
          if ($dropdown.hasClass('isopen')) { //Close self if already open
            $dropdown.removeClass('isopen');
            $navmenu.removeClass('isopen');
            $(this).removeClass('isopen'); //brighten the icon
            document.documentElement.classList.remove('emerge-nav-open');
          } else {
            $dropdown.addClass('isopen'); //Open if not open
            $navmenu.addClass('isopen');
            $(this).addClass('isopen'); //gray the icon
            document.documentElement.className += " emerge-nav-open";
          }
        });
      });
    }
  };


  dbfFooterToggler = {
    attach: function (context, settings) {
      var $s1 = '.block--menu .block__title';
      var $s2 = '.block--menu-block .block__title';
      var $s3 = '#block-block-31 .block__title';
      $($s1).add($s2).add($s3).click(function (e) {
        if ($(this).parent().hasClass('isopen')) { //Close self if already open
          $(this).parent().removeClass('isopen');
          $(this).parent().addClass('isclosed');
        } else {
          $(this).parent().addClass('isopen'); //Open if not open
          $(this).parent().removeClass('isclosed');
        }
      });
    }
  };

  dbfMMenuClose = {
    attach: function (context, settings) {
      $(".mmenu-close").click(function (ev) {
        ev.preventDefault();
        junk = ev.defaultPrevented;
        if ($("html").hasClass("mm-opened")) {
          $('#mmenu_right').mmenu().trigger("close.mm");
        } else {
          $('#mmenu_right').mmenu().trigger("open.mm");
        }
      });
    }
  };

  dbfStickyMenu = { //show sticky menu on scroll
    attach: function (context, settings) {
      var $window    = $(window);
      var $html      = $('html');
      var searchbar  = '#search-bar';
      var hamburger  = '.hamburger';
      var dropdown   = '.l-nav-drop-region';
      var navmenu    = '.l-nav-drop .menu-wrapper > ul.menu';
      var $searchbar = $(searchbar);
      var $hamburger = $(hamburger);
      var $dropdown  = $(dropdown);
      var $navmenu   = $(navmenu);

      $window.scroll(function () {
        if ($(this).scrollTop() > 10) { //roll past the menu
          $html.addClass("sticky");
          $html.removeClass("not-sticky");
        } else {
          $html.addClass("not-sticky");
          $html.removeClass("sticky");
          $navmenu.removeClass('isopen');
          $dropdown.removeClass('isopen');
          $hamburger.removeClass('isopen');
          $searchbar.removeClass('isopen');
        }
      });
    }
  };

  dbfSrollToAnchor = { //Scroll to 80px above anchor, exact height of our sticky nav-bar
    attach: function (context, settings) {
      $(window).on("hashchange", function () {
        //window.scrollTo(window.pageXOffset, window.pageYOffset - 80);
        window.scrollTo(window.pageXOffset, window.pageYOffset);
      });
    }
  };

  dbfPaneTitleMover = {
    attach: function (context, settings) {
      $('.panel-pane').each(function () {
        if ($(this).hasClass('pane-fieldable-panels-pane') && !$(this).hasClass('pane-bundle-multiple-image-pane') && !$(this).hasClass('pane-bundle-slideshow-panel')) {
          $(this).find('.pane-title').prependTo($(this).find('.group-content-group'));
        }
      });
    }
  };
  
  dbfSlickSlider = {
    attach: function (context, settings) {
      $('body').once(function () {
        $('.slick-slider').slick({
          lazyLoad: 'progressive',
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          fade: false,
          arrows: false,
          cssEase: 'linear',
          adaptiveHeight: false, //true
          //centerMode: true,
          //centerPadding: '0px',
        });
        
        $('.pane-bundle-slideshow-panel .field--name-field-pane-slideshow-slides .field-items-group').slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          asNavFor: '.pane-bundle-slideshow-panel .field--name-field-pane-slideshow-controls .field__items'
        });

        $('.pane-bundle-slideshow-panel .field--name-field-pane-slideshow-controls .field__items').each(function( index ) {
          slick_args = {
            slidesToShow: 7,
            slidesToScroll: 7,
            asNavFor: '#' + $(this).parents('.pane-bundle-slideshow-panel').attr('id') + ' .field--name-field-pane-slideshow-slides .field-items-group',
            dots: true,
            arrows: false,
            //centerMode: true,
            //centerPadding: '0px',
            focusOnSelect: true,
            adaptiveHeight: false //true
          }; //console.log(slick_args);

          $(this).slick(slick_args);
        });

        $('.pane-bundle-slideshow-panel').each(function( index ) {
          $(this).find('.field--name-field-pane-slideshow-slides .field-items-group').on('beforeChange', function (event, slick, slide, nextSlide) {
            parentfpp = "";
            parentfpp = $(this).parents('.pane-bundle-slideshow-panel');
            paneid = "";
            paneid = "#" + parentfpp.attr('id'); //console.log(paneid);
            $(paneid).find('.field--name-field-pane-slideshow-controls .field__items .slick-slide')
              .removeClass('slick-current')
              .eq(nextSlide)
              .addClass('slick-current');
          });
        });

        $('.slick-cloned a').removeAttr('rel');
      });
    }
  };

  dbfSliderTrack = {
    attach: function (context, settings) {
      if ($(window).width() < 725) {
        $('.field--name-field-pane-slideshow-controls .slick-track').addClass('slick-track-m');
      }
      $(window).resize(function () {
        if ($(window).width() < 725) {
          $('.field--name-field-pane-slideshow-controls .slick-track').addClass('slick-track-m');
        } else {
          $('.field--name-field-pane-slideshow-controls .slick-track').removeClass('slick-track-m');
        }
      });
    }
  };

  dbfEqualHeights = {
    attach: function (context, settings) {
      $('body').once(function () {
        // apply matchHeight to each item container's items
        $('.pane-bundle-multiple-image-pane .field__items').each(function () {
          $(this).find('.field-collection-item-field-multiple-image-panes').matchHeight();
        });

        $('.pane-bundle-slideshow-panel .field-collection-container').each(function () {
          //var $slidetext = $(this).find('.group-content-group');
          //var $slideimg  = $(this).find('.field--name-field-slide-image .field__item');
          $(this).find('.field-group-div').matchHeight();
        });

        $('.pane-related-blogs-pane-related-blog-3 .view-content').each(function () {
          $(this).children('.views-row').matchHeight();
        });

        $('.site-main').add('.site-sidebar-right').matchHeight();
      });

      //Placing outside $body.once() to run on every breakpoint change
      $('.phone .pane-bundle-slideshow-panel .field-collection-container').each(function () {
        $(this).find('.slick-slide').matchHeight();
        $(this).find('.group-content-group').matchHeight();
      });

      $('.phablet .pane-bundle-slideshow-panel .field-collection-container').each(function () {
        $(this).find('.slick-slide').matchHeight();
        $(this).find('.group-content-group').matchHeight();
      });
    }
  };

  dbfSubnav = {
    attach: function (context, settings) {
      if ($('.menu-subnav').length) {
        $('.menu-subnav a').each(function () {
          if ($(this).attr('href') == window.location.pathname) {
            $(this).parent('li').addClass('active');
          }
        });
      }
    }
  };

  dbfMeetUsButton = {
    attach: function (context, settings) {
      $(document).on('click', '.meet-us-button', function () {
        var EventName = jQuery(this).data().eventname;
        var EventURL = location.origin + '/node/' + jQuery(this).data().nid;
        $('#colorbox-content').data("eventname", EventName).data("eventurl", EventURL);
      });
    }
  };

  dbfSlickArrowCenter = {
    attach: function (context, settings) {
      $('.slick-slider').each(function () {
        var captionHeight = $(this).find('.slick-active .caption').outerHeight() / 2;
        $(this).find('.slick-arrow').each(function () {
          $(this).css('margin-top', -captionHeight);
        });
      }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        var nextSlideDom = slick.$slides[nextSlide];
        var captionHeight = $(nextSlideDom).find('.caption').outerHeight() / 2;
        $(this).find('.slick-arrow').each(function () {
          $(this).css('margin-top', -captionHeight);
        });
      });
    }
  };

  dbfResourceFilters = { //Make drop downs from links
    attach: function (context, settings) {
      $("body").once(function () {
        var $ViewsExposedFormBlogsLandingPage = $('#views-exposed-form-blogs-landing-page-blogs');
        $ViewsExposedFormBlogsLandingPage.find('.views-exposed-widget').not('.views-submit-button').wrapAll('<div class="exposed-wrapper-outer clearfix"><div class="exposed-wrapper-inner clearfix"></div></div>');
        $ViewsExposedFormBlogsLandingPage.find('.views-exposed-widget.views-submit-button').wrapAll('<div class="filterbar-wrapper-outer clearfix"></div>');

        var $ViewsExposedFormResources = $('#views-exposed-form-resources-resources');
        $ViewsExposedFormResources.find('.views-exposed-widget').not('.views-submit-button').wrapAll('<div class="exposed-wrapper-outer clearfix"><div class="exposed-wrapper-inner clearfix"></div></div>');
        $ViewsExposedFormResources.find('.views-exposed-widget.views-submit-button').wrapAll('<div class="filterbar-wrapper-outer clearfix"></div>');
      });
    }
  };

  dbfCustomerSort = {
    attach: function (context, settings) {
      //console.log( JSON.stringify(Drupal.settings.cardsort) );
      var sortargs = ''; //argument list
      var sortby   = '';

      for (var tcount in Drupal.settings.cardsort) {
        //Create the masonry sort arguments JSON object
        tid = Drupal.settings.cardsort[tcount];

        sortargs += "tid_" + tid + ":'[data-tid-" + tid + "]'";

        if(tcount < Drupal.settings.cardsort.length-1) {
          sortargs += ",";
        }
      }

      sortargs   = 'sortargs={'+sortargs+'};'; //console.log(sortargs);
      sortconfig = eval(sortargs);             //console.log(sortconfig);

      var isoconfig = {
        "getSortData": sortconfig,
        "itemSelector": ".views-row",
        "layoutMode": "masonry"
      };

      var $isogrid = $('.view-id-customers .view-content');
      $isogrid.isotope(isoconfig); //load the masonry config
      //$isogrid.isotope({ sortBy : 'random' });

      $('.sort-link').click(function (e) { //attach the click actions
        e.preventDefault();
        junk = e.defaultPrevented;
        sortby = "tid_" + $(this).data().tid;
        industry = $(this).data().industry;
        $('#sort-industry').html(industry);
        $('.sort-link').removeClass('active');
        $(this).addClass('active');
        $isogrid.isotope({"sortBy": sortby});
      }).mouseover(function (e) { //attach the mouse-over actions
        industry = $(this).data().industry;
        $('#sort-industry').css('display','none');
        $('#sort-hover').html(industry).css('display','inline-block');
      }).mouseout(function (e) { //attach the mouse-out actions
        $('#sort-hover').html('').css('display','none');
        $('#sort-industry').css('display','inline-block');
      });

      $('#sort-default').click(function (e) { //default sort button
        e.preventDefault();
        junk = e.defaultPrevented;
        $('#sort-industry').html('Case Study');
        $('.sort-link').removeClass('active');
        $(this).addClass('active');
        $isogrid.isotope({ sortBy : 'original-order' });
      }).mouseover(function (e) { //attach the mouse-over actions
        $('#sort-industry').css('display','none');
        $('#sort-hover').html('Case Study').css('display','inline-block');
      }).mouseout(function (e) { //attach the mouse-out actions
        $('#sort-hover').html('').css('display','none');
        $('#sort-industry').css('display','inline-block');
      });

    }
  };

  dbfReverseEmail = {
    attach: function (context, settings) {
      $('a.anti-spam-email', context).once('anti-spam', function () {
        var backwardtext = $(this).attr("href"); //Get backward email, reverse it, add mailto:
        var normaltext = backwardtext.split("").reverse().join("");
        $(this).attr("href", "mailto:" + normaltext); //replace backward email link
      });
    }
  };

  dbfAcceptCookiePolicy = {
    attach: function (context, settings) {
      var accepted = jQuery.cookie('accept_cookie_policy');

      if(accepted) {
        $('#cookie-bar').removeClass('isopen').addClass('isclosed');
      } else {
        $('#cookie-bar').removeClass('isclosed').addClass('isopen');
        $('#acceptcookiepolicy').click(function (e) {
          e.preventDefault();
          junk = e.defaultPrevented;
          var cookietimestamp = (new Date).getTime();
          jQuery.cookie('accept_cookie_policy', cookietimestamp, {
            expires: 365,
            path: '/',
            domain: 'benmirkhah.com',
            secure: true
          });
          $('#cookie-bar').removeClass('isopen').addClass('isclosed');
        });
      }
    }
  };

  /* //NOT NEEDED, REMOVING IN THE TEMPLATE FILE
  dbfRemoveDuplicate = { //Featured items should not be repeated in listings below them
    attach: function (context, settings) {
      $(".featured-article .views-row-1").attr("id", function () {
      //$(".view-display-id-first_article .views-row-1").attr("id", function () {
        var dupnid = this.id;
        dupnid = "#nid" + dupnid.substring(3);
        $(dupnid).css('display', 'none'); //hide the duplicate item
      });
    }
  }; */
})(jQuery);
