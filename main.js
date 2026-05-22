(function(){
  'use strict';

  document.addEventListener('DOMContentLoaded', function(){

    // Scroll reveal
    var revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && revealEls.length) {
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      revealEls.forEach(function(el){ io.observe(el); });
    } else {
      revealEls.forEach(function(el){ el.classList.add('in-view'); });
    }

    // Stagger children with .reveal-stagger > *
    document.querySelectorAll('.reveal-stagger').forEach(function(parent){
      Array.prototype.slice.call(parent.children).forEach(function(child, i){
        child.classList.add('reveal');
        child.style.transitionDelay = (i * 80) + 'ms';
      });
    });

    // Smooth anchor scroll
    document.querySelectorAll('a[href^="#"]').forEach(function(a){
      a.addEventListener('click', function(e){
        var id = a.getAttribute('href');
        if (id.length > 1) {
          var target = document.querySelector(id);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });

    // Header scrolled state
    var header = document.querySelector('.site-header');
    if (header) {
      var onScroll = function(){
        if (window.scrollY > 30) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Hamburger nav
    var toggle = document.querySelector('.nav-toggle');
    var menu = document.querySelector('.nav-menu');
    if (toggle && menu) {
      toggle.setAttribute('aria-expanded', 'false');
      var closeMenu = function(){
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      };
      var openMenu = function(){
        menu.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
      };
      var toggleMenu = function(){
        if (menu.classList.contains('open')) closeMenu(); else openMenu();
      };
      toggle.addEventListener('click', toggleMenu);
      toggle.addEventListener('keydown', function(e){
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleMenu(); }
      });
      menu.querySelectorAll('a').forEach(function(link){
        link.addEventListener('click', closeMenu);
      });
      document.addEventListener('click', function(e){
        if (!menu.contains(e.target) && !toggle.contains(e.target) && menu.classList.contains('open')) {
          closeMenu();
        }
      });
      document.addEventListener('keydown', function(e){
        if (e.key === 'Escape' && menu.classList.contains('open')) closeMenu();
      });
    }

  });
})();
