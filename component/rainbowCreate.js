// rainbowCreate
(function( $ ){
  "use strict"
  var scripts = document.getElementsByTagName("script");
  var urlBase = scripts[scripts.length-1].src;
  urlBase = urlBase.replace('rainbowCreate_es5.js', '');
  urlBase = urlBase.replace('rainbowCreate.js', '');

  // Public methods
  let api = {
    init : function(options) {
      const $el = $(this);
      methods.initRainbowCreate($el, options);
    },
    destroy: function(){
      // destroy plugin
    }
  }

  // Private methods
  let methods = {
    initRainbowCreate: function($el, options){
      // get plugin template
      let rainbowCreate = methods.getTemplate('rainbowCreate.html');
      rainbowCreate.then((res) => {
        $el.append( res({
          direction: options.direction
        }) );
      }).then(() => {
        methods.drawLines($el, options);
      }).then(() => {
        methods.paintLines($el, options);
      })

    },
    paintLines: function($el, options){
      let $rainbow = $el.find('.rainbowCreate');
      let linesNumber = $rainbow.find('.rainbowLine').size();
      let startColor = options.colorRank[0];
      let endColor = options.colorRank[1];
      let rank = endColor - startColor;
      let gap = rank/linesNumber;

      return new Promise(function(resolve, reject) {
        if(options.reverse == true){
          for(let i=0;i<linesNumber;i++){
            let colorNumber = endColor - (i+1)*gap
            $el.find('.rainbowCreate > div:nth-child(' + parseInt(i+1) + ')').css({
              'background-color': 'hsla(' + colorNumber + ',' + options.saturation + '%,' + options.light + '%,' + options.alpha + ')'
            })
          }
        }else{
          for(let i=0;i<linesNumber;i++){
            let colorNumber = startColor + (i+1)*gap
            $el.find('.rainbowCreate > div:nth-child(' + parseInt(i+1) + ')').css({
              'background-color': 'hsla(' + colorNumber + ',' + options.saturation + '%,' + options.light + '%,' + options.alpha + ')'
            })
          }
        }
        resolve();
      });
    },
    drawLines: function($el, options){
      let linesWidth = options.linesWidth;
      let direction = options.direction;
      let $rainbow = $el.find('.rainbowCreate');

      return new Promise(function(resolve, reject){
        let containerWidth = $el.width();
        let actualWidth = 0;
        while(actualWidth < containerWidth){
          if(direction == 'vertical'){
            $rainbow.append('<div class="rainbowLine vertical" style="width:' + linesWidth + 'px;"></div>');
          }else if(direction == 'horizontal'){
            $rainbow.append('<div class="rainbowLine horizontal" style="height:' + linesWidth + 'px;"></div>');
          }
          actualWidth += linesWidth;
        }
        resolve();
      })
    },
    getTemplate: function(name){
      return new Promise(function(resolve, reject){
          $.get(urlBase + "templates/" + name, function( result ) {
            resolve(_.template(result));
          }).fail(function() {
            reject('no template')
          });
        }
      );
    }
  }

  // Events
  var events = {
    // add some events
  };

  // jquery component stuff
  $.fn.rainbowCreate = function(methodOrOptions) {
      if ( api[methodOrOptions] ) {
          return api[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ))
      } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
          // Default to "init"
          return api.init.apply( this, arguments )
      } else {
          $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.rainbowCreate' )
      }
  };


})( jQuery )
