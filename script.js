var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-80px";
  }
  prevScrollpos = currentScrollPos;
};

//////////////////////////////Experience Section Tabs////////////////////////////////////////////

function vertical_tabs() {
  if ($(".ux-vertical-tabs").length > 0) {
    $(".ux-vertical-tabs .tabs button").on("click", function() {
      var temp_tab = $(this).data("tab");
      var temp_tab_js = this.getAttribute("data-tab");
      var temp_content = $(
        '.ux-vertical-tabs .maincontent .tabcontent[data-tab="' +
          temp_tab +
          '"]'
      );
      var temp_content_js = document.querySelector(
        '.ux-vertical-tabs .maincontent .tabcontent[data-tab="' +
          temp_tab_js +
          '"]'
      );
      var temp_content_active_js = document.querySelector(
        ".ux-vertical-tabs .maincontent .tabcontent.active"
      );

      $(".ux-vertical-tabs .tabs button").removeClass("active");
      $('.ux-vertical-tabs .tabs button[data-tab="' + temp_tab + '"]').addClass(
        "active"
      );

      var animation_start = anime({
        duration: 400,
        targets: temp_content_active_js,
        opacity: [1, 0],
        translateX: [0, "100%"],
        easing: "easeInOutCubic",
        complete: function() {
          $(".ux-vertical-tabs .maincontent .tabcontent").removeClass("active");
          temp_content.addClass("active");
          var animation_end = anime({
            duration: 400,
            targets: temp_content_js,
            opacity: [0, 1],
            translateX: ["100%", "0"],
            easing: "easeInOutCubic"
          });
        }
      });
    });
  }
}

$(function() {
  vertical_tabs();
});

////////////////////////// back to top button//////////////////////////////////////

$(function() {
  var offset = 300,
    duration = 500,
    top_section = $(".to-top"),
    toTopButton = $("a.back-to-top");
  // showing and hiding button according to scroll amount (in pixels)
  $(window).scroll(function() {
    if ($(this).scrollTop() > offset) {
      $(top_section).fadeIn(duration);
    } else {
      $(top_section).fadeOut(duration);
    }
  });

  // activate smooth scroll to top when clicking on the button

  $(toTopButton).click(function(e) {
    e.preventDefault();
    $("html, body").animate(
      {
        scrollTop: 0
      },
      700
    );
  });
});

////////////////////////   Smooth Scroll    //////////////////////////

document.addEventListener("click", function(e) {
  if (e.target.tagName !== "A") return;

  if (
    e.target.href &&
    e.target.href.indexOf("#") != -1 &&
    (e.target.pathname == location.pathname ||
      "/" + e.target.pathname == location.pathname) &&
    e.target.search == location.search
  ) {
    scrollAnchors(e, e.target);
  }
});

function scrollAnchors(e, respond = null) {
  function distanceToTop(el) {
    return Math.floor(el.getBoundingClientRect().top);
  }

  e.preventDefault();
  var targetID = respond
    ? respond.getAttribute("href")
    : this.getAttribute("href");
  var targetAnchor = document.querySelector(targetID);
  if (!targetAnchor) return;
  var originalTop = distanceToTop(targetAnchor);
  window.scrollBy({ top: originalTop, left: 0, behavior: "smooth" });
  var checkIfDone = setInterval(function() {
    var atBottom =
      window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
    if (distanceToTop(targetAnchor) === 0 || atBottom) {
      targetAnchor.tabIndex = "-1";
      targetAnchor.focus();

      if ("history" in window) {
        window.history.pushState("", "", targetID);
      } else {
        window.location = targetID;
      }

      clearInterval(checkIfDone);
    }
  }, 100);
}
