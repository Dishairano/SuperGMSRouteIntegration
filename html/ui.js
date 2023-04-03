(function ($) {
  $.extend({
      playSound: function () {
        return $(
        '<audio class="sound-player" autoplay="autoplay" style="display:none;">'
        +'<source src="' + arguments[0] + '" />'
        +'<embed src="' + arguments[0] + '" hidden="true" autostart="true" loop="false"/>'
        +'</audio>'
        ).appendTo('body');
      },
      stopSound: function () {
          $(".sound-player").remove();
      }
  });
})(jQuery);

$(function() {
  window.addEventListener('message', function(event) {
    if (event.data.name == "addNotification"){
      createnotify(event.data.message, event.data.type);
    }
  });
});

var index = 0, notifys = [], maxOpened = 5;
function createnotify(message, type) {
  var notify = {}
  notify.id = index++;
  
  if (type == 'info') {
    notify.code = '<div id="notify-'+notify.id+'" class="notify">'+
    '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 0C15.523 0 20 4.478 20 10C20 15.522 15.523 20 10 20C4.477 20 0 15.522 0 10C0 4.478 4.477 0 10 0ZM10 13.5C9.44772 13.5 9 13.9477 9 14.5C9 15.0523 9.44772 15.5 10 15.5C10.5523 15.5 11 15.0523 11 14.5C11 13.9477 10.5523 13.5 10 13.5ZM10 4.75C8.48122 4.75 7.25 5.98122 7.25 7.5C7.25 7.91421 7.58579 8.25 8 8.25C8.3797 8.25 8.69349 7.96785 8.74315 7.60177L8.75 7.5C8.75 6.80964 9.30964 6.25 10 6.25C10.6904 6.25 11.25 6.80964 11.25 7.5C11.25 8.03882 11.115 8.30526 10.6051 8.8322L10.4697 8.96967C9.59157 9.84777 9.25 10.4171 9.25 11.5C9.25 11.9142 9.58579 12.25 10 12.25C10.4142 12.25 10.75 11.9142 10.75 11.5C10.75 10.9612 10.885 10.6947 11.3949 10.1678L11.5303 10.0303C12.4084 9.15223 12.75 8.58295 12.75 7.5C12.75 5.98122 11.5188 4.75 10 4.75Z" fill="white"/></svg>' +
    '<div id="circle-'+notify.id+'" class="circle"></div><div class="text"><span>'+message+'</span></div>' +
    '</div>';
  } else if (type == 'success') {
    notify.code = '<div id="notify-'+notify.id+'" class="notify">'+
    '<svg width="20" height="19" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.7319 0.295798C13.639 0.20207 13.5284 0.127675 13.4065 0.0769067C13.2846 0.026138 13.1539 0 13.0219 0C12.8899 0 12.7592 0.026138 12.6373 0.0769067C12.5155 0.127675 12.4049 0.20207 12.3119 0.295798L4.86192 7.7558L1.73192 4.6158C1.6354 4.52256 1.52146 4.44925 1.3966 4.40004C1.27175 4.35084 1.13843 4.32671 1.00424 4.32903C0.870064 4.33135 0.737655 4.36008 0.614576 4.41357C0.491498 4.46706 0.380161 4.54428 0.286922 4.6408C0.193684 4.73732 0.12037 4.85126 0.0711659 4.97612C0.0219619 5.10097 -0.00216855 5.2343 0.000152918 5.36848C0.00247438 5.50266 0.0312022 5.63507 0.0846957 5.75814C0.138189 5.88122 0.215401 5.99256 0.311922 6.0858L4.15192 9.9258C4.24489 10.0195 4.35549 10.0939 4.47735 10.1447C4.59921 10.1955 4.72991 10.2216 4.86192 10.2216C4.99393 10.2216 5.12464 10.1955 5.2465 10.1447C5.36836 10.0939 5.47896 10.0195 5.57192 9.9258L13.7319 1.7658C13.8334 1.67216 13.9144 1.5585 13.9698 1.432C14.0252 1.30551 14.0539 1.1689 14.0539 1.0308C14.0539 0.892697 14.0252 0.756092 13.9698 0.629592C13.9144 0.503092 13.8334 0.389441 13.7319 0.295798V0.295798Z" fill="white"/></svg><div id="circle-'+notify.id+'" class="circle"></div><div class="text"><span>'+message+'</span></div>' +
    '</div>';
  } else if (type == 'error') {
    notify.code = '<div id="notify-'+notify.id+'" class="notify">'+
    '<svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.91703 0.282164C9.9568 -0.293749 11.2548 0.0408933 11.8927 1.0224L11.9755 1.16023L19.7344 15.1685C19.9192 15.5021 20.0162 15.8773 20.0162 16.2587C20.0162 17.4495 19.091 18.4243 17.9202 18.5035L17.7662 18.5087H2.25041C1.8691 18.5087 1.49405 18.4118 1.16046 18.2271C0.120624 17.6513 -0.284417 16.3734 0.209138 15.312L0.282035 15.1687L8.03883 1.16046C8.24336 0.791099 8.54769 0.486735 8.91703 0.282164ZM10.009 13.5018C9.45744 13.5018 9.01032 13.9489 9.01032 14.5004C9.01032 15.052 9.45744 15.4991 10.009 15.4991C10.5605 15.4991 11.0076 15.052 11.0076 14.5004C11.0076 13.9489 10.5605 13.5018 10.009 13.5018ZM10.0068 5.49806C9.49399 5.49825 9.07145 5.88444 9.01387 6.3818L9.00718 6.49842L9.00898 11.4993L9.01575 11.6159C9.0737 12.1132 9.49651 12.4991 10.0093 12.4989C10.5222 12.4988 10.9447 12.1126 11.0023 11.6152L11.009 11.4986L11.0072 6.4977L11.0004 6.38108C10.9425 5.88376 10.5197 5.49788 10.0068 5.49806Z" fill="white"/></svg><div id="circle-'+notify.id+'" class="circle"></div><div class="text"><span>'+message+'</span></div>' +
    '</div>';
  } else if (type == 'warn') {
    notify.code = '<div id="notify-'+notify.id+'" class="notify">'+
    '<svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.91703 0.282164C9.9568 -0.293749 11.2548 0.0408933 11.8927 1.0224L11.9755 1.16023L19.7344 15.1685C19.9192 15.5021 20.0162 15.8773 20.0162 16.2587C20.0162 17.4495 19.091 18.4243 17.9202 18.5035L17.7662 18.5087H2.25041C1.8691 18.5087 1.49405 18.4118 1.16046 18.2271C0.120624 17.6513 -0.284417 16.3734 0.209138 15.312L0.282035 15.1687L8.03883 1.16046C8.24336 0.791099 8.54769 0.486735 8.91703 0.282164ZM10.009 13.5018C9.45744 13.5018 9.01032 13.9489 9.01032 14.5004C9.01032 15.052 9.45744 15.4991 10.009 15.4991C10.5605 15.4991 11.0076 15.052 11.0076 14.5004C11.0076 13.9489 10.5605 13.5018 10.009 13.5018ZM10.0068 5.49806C9.49399 5.49825 9.07145 5.88444 9.01387 6.3818L9.00718 6.49842L9.00898 11.4993L9.01575 11.6159C9.0737 12.1132 9.49651 12.4991 10.0093 12.4989C10.5222 12.4988 10.9447 12.1126 11.0023 11.6152L11.009 11.4986L11.0072 6.4977L11.0004 6.38108C10.9425 5.88376 10.5197 5.49788 10.0068 5.49806Z" fill="white"/></svg><div id="circle-'+notify.id+'" class="circle"></div><div class="text"><span>'+message+'</span></div>' +
    '</div>';
  }

  if (maxOpened && notifys.length >= maxOpened) {
    remove(notifys[0].id)
  }

  notifys.push(notify);
  $(notify.code).appendTo('notification-box')
  if (type == 'info') $('#notify-'+notify.id).addClass('info');
  if (type == 'success') $('#notify-'+notify.id).addClass('success');
  if (type == 'error') $('#notify-'+notify.id).addClass('error');
  if (type == 'warn') $('#notify-'+notify.id).addClass('warn');

  if (type == 'info') $('.notify .circle-'+notify.id).addClass('info');
  if (type == 'success') $('.notify .circle-'+notify.id).addClass('success');
  if (type == 'error') $('.notify .circle-'+notify.id).addClass('error');
  if (type == 'warn') $('.notify .circle-'+notify.id).addClass('warn');
  $('#notify-'+notify.id).addClass('notify-enter');
  $.playSound('./intuition.mp3')
    setTimeout(function(){
      $('#notify-'+notify.id).removeClass('notify-enter');
      remove(notify.id);
    }, 5000);
}

function remove(id) {
    var notify = findnotify(id);

    if (notify) {
        $('#notify-'+id).addClass('notify-leave')
        setTimeout(function() {
        $('#notify-'+id).css('display', 'none');
        $('#notify-'+id).remove();
        }, 500);
        var index = notifys.indexOf(notify)
        notifys.splice(index, 1)
    }
    
    function findnotify(notifyId) {
      for (var i = 0; i < notifys.length; i++) {
        if (notifys[i].id == id) {
          return notifys[i]
        }
      }
    }

}