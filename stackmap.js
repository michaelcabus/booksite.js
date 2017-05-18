// integrated at
//  https://bearcat.hotchkiss.org/cgi-bin/koha/opac-search.pl?expanded_options=0

jQuery.noConflict();

/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 *
 * Requires: 1.2.2+
 */


function Coordinate(startX, startY) {
    this.x = startX;
    this.y = startY;
}

function StackMapZoomMap(o){
    var defaults = {
    boxHeight: 510,
    boxWidth: 680,
    container: jQuery('#SMmap-container'),
    fitX: 0,
    fitY: 0,
    lockEdges: true,
    locXContents: '.loc-x',
    locYContents: '.loc-y',
    mapSelector: '.SMmap',
    originalWidth: 800,
    originalHeight: 600,
    overlaySelector: '.SMmap-overlay',
    sizeXContents: '.size-x',
    sizeYContents: '.size-y',
    windowSelector: '.SMmap-window',
    zoomFactor: 1.125,
    zoomFit: -1, //if -1, then zoom all the way out
    zoomFitBtn: '.zoom-fit',
    zoomInBtn: '.zoom-in',
    zoomMin: 1,
    zoomMax: 1.423828125, //adjust to max zoom in
    zoomOutBtn: '.zoom-out'
    };
    var m = this;
    jQuery.extend(m, defaults, o);

    m.mapWindow = m.container.find(m.windowSelector);
    m.popupWindow = m.mapWindow.closest('.SMpopup');
    m.map = m.mapWindow.find(m.mapSelector);
    m.mapElem = m.map[0];
    m.overlay = m.mapWindow.find(m.overlaySelector);
    m.overlayElem = m.overlay[0];
    m.sizeXContents = m.overlay.find(m.sizeXContents);
    m.sizeYContents = m.overlay.find(m.sizeYContents);
    m.locXContents = m.overlay.find(m.locXContents);
    m.locYContents = m.overlay.find(m.locYContents);
    m.halfBoxHeight = m.boxHeight / 2;
    m.halfBoxWidth = m.boxWidth / 2;

    m.curZoomFactor = 1;
    m.zoomFactorElem = m.mapWindow.find(m.zoomFactorSelector)[0];
    m.zoomMin = Math.min(m.boxWidth / m.originalWidth, m.boxHeight / m.originalHeight);

    if(m.zoomMin < 1)
    m.zoomMin = Math.pow(m.zoomFactor, (Math.floor(Math.log(m.zoomMin) / Math.log(m.zoomFactor))));

    if(m.zoomFit == -1)
    m.zoomFit = m.zoomMin;

    m.curSize = new Coordinate;
    m.mousePosition = new Coordinate;

    m.moveMap = function (x, y) {
        var newX = x, newY = y;
        if(m.lockEdges) {
            var rightEdge = -m.curSize.x + m.boxWidth;
        var topEdge = -m.curSize.y + m.boxHeight;
            newX = newX < rightEdge ? rightEdge : newX;
            newY = newY < topEdge ? topEdge : newY;
            newX = newX > 0 ? 0 : newX;
            newY = newY > 0 ? 0 : newY;
    }
    m.mapElem.style.left = newX + 'px';
    m.mapElem.style.top = newY + 'px';
    m.overlayElem.style.left = newX + 'px';
    m.overlayElem.style.top = newY + 'px';
    }

    m.setZoomFactor = function(newZoomFactor, focusX, focusY){
    if(m.curZoomFactor == newZoomFactor) return;
    if(newZoomFactor < m.zoomMin) newZoomFactor = m.zoomMin;
    if(newZoomFactor > m.zoomMax) newZoomFactor = m.zoomMax;

    var mapPosition = m.map.position();
        var curFocusX = (-mapPosition.left + focusX) / m.curZoomFactor,
    curFocusY = (-mapPosition.top + focusY) / m.curZoomFactor;

    m.curZoomFactor = newZoomFactor;
    m.curSize.x = m.originalWidth * m.curZoomFactor;
    m.curSize.y = m.originalHeight * m.curZoomFactor;

    m.mapElem.style.width = m.curSize.x + 'px';
    m.mapElem.style.height = m.curSize.y + 'px';

    m.sizeXContents.each(function(){jQuery(this).width(Math.ceil(jQuery(this).attr('width') * m.curZoomFactor));});
    m.sizeYContents.each(function(){jQuery(this).height(Math.ceil(jQuery(this).attr('height') * m.curZoomFactor));});

    m.locXContents.css('top', function(){return jQuery(this).attr('y') * m.curZoomFactor;});
    m.locYContents.css('left', function(){return jQuery(this).attr('x') * m.curZoomFactor;});

    curFocusX = focusX - (curFocusX * newZoomFactor);
    curFocusY = focusY - (curFocusY * newZoomFactor);
    m.moveMap(curFocusX, curFocusY);
    }

    m.setZoomFactor(m.zoomFit, m.halfBoxWidth, m.halfBoxHeight);

    m.mouseMove = function(event){
        event.preventDefault();
        var e = event.pageX - m.mousePosition.x + m.map.position().left,
            d = event.pageY - m.mousePosition.y + m.map.position().top;
        m.moveMap(e, d);
        m.mousePosition.x = event.pageX;
        m.mousePosition.y = event.pageY;
    }

    m.map.mousedown(function(event){
        event.preventDefault();
        m.mousePosition.x = event.pageX;
        m.mousePosition.y = event.pageY;

        jQuery(document).mousemove(m.mouseMove);
        jQuery(document).mouseup(function(){jQuery(document).unbind('mousemove');});
    });

    m.container.find(m.zoomInBtn).click(function(){m.setZoomFactor(m.curZoomFactor * m.zoomFactor, m.halfBoxWidth, m.halfBoxHeight);});
    m.container.find(m.zoomOutBtn).click(function(){m.setZoomFactor(m.curZoomFactor / m.zoomFactor, m.halfBoxWidth, m.halfBoxHeight);});
    m.container.find(m.zoomFitBtn).click(function(){m.setZoomFactor(m.zoomFit, m.halfBoxWidth, m.halfBoxHeight); m.moveMap(m.fitX, m.fitY);});
    // console.log('m', m)
    // console.log('m', m.mapWindow)
    // m.mapWindow.mousewheel(function(event, delta) {
    //     var mapPosition = m.mapWindow.position();
    //     var popupPosition = m.popupWindow.position();
    //     m.setZoomFactor(m.curZoomFactor * Math.pow(m.zoomFactor, delta), event.pageX - mapPosition.left - popupPosition.left, event.pageY - mapPosition.top - popupPosition.top);
    //     event.preventDefault();
    // });
}


function trimHTML(text){
    text = jQuery.trim(text).replace('&', '%26');
    if(text.indexOf('<') != -1)
        return text.substring(0, text.indexOf('<'));
    else
        return text;
}


function exitEarly(lib, loc, callno){
    if (lib === '' || lib === undefined) return true;
     if (loc === '' || loc === undefined) return true;
    if (callno === '' || callno === undefined) return true;
    return false;
}

var StackMap = StackMap || {
    domain: 'https://hotchkiss.stackmap.com',  // TODO
    popupCounter: 0,
    delayImgLoad: true,  // TODO
    maxRequestSize: 20, // TODO
    setup: function(){
        jQuery("body").append('<div id="SMblock-screen"></div>');
        jQuery('#SMblock-screen').click(StackMap.hideAllPopups);
        jQuery("body").append('<div id="SMtooltip"><p></p></div>');

        jQuery(document)
            .on('mousedown', '.SMpin-target', function(e){
                e.stopPropagation();
                })
            .on('mouseenter', '.SMpin-target', function(e){
                 jQuery('#SMtooltip')
                    .css('left', jQuery(this).offset().left + jQuery(this).width() + 5)
                    .css('top', jQuery(this).offset().top);
                 jQuery('#SMtooltip p').html(
                     jQuery(this).find('.SMtooltip-contents').html());
                 jQuery('#SMtooltip').fadeIn();
                })
            .on('mouseleave', '.SMpin-target', function(e){
                     jQuery('#SMtooltip').fadeOut();
                });

        jQuery(document).on('click', '.SMclose', StackMap.hideAllPopups);

        jQuery(document).on('click', '.SMprinter-friendly', function(){
                var $popup = jQuery(this).closest('.SMpopup');
            StackMap.openPrinterFriendly(
                $popup.data('callno'), $popup.data('location'),
                $popup.data('library'), $popup.data('title'));
            });
        StackMap.addPopups();
    },
    addPopups: function(){
        var allHoldings = [];
        var allEntries = [];
        var library = 'Hotchkiss';

        // var $summaryView = !!jQuery('.searchsummary').length;
        // detail view
        jQuery('#holdings tbody tr').not('.sm-checked').each(function(){

            var $targetNode = jQuery(this);
            var cells = $targetNode.find('td');
                    
            $targetNode.addClass('sm-checked');
            
            var callno = $targetNode.find('.call_no').text().trim();
            // remove link found in parenthesis
            callno = callno.split('(')[0].trim()                

            var location = $targetNode.find('.location').text().trim();
            var collection = $targetNode.find('.collection').text().trim();
            if (collection){
                location = location + ' - ' + collection;
            }
            console.log('c', callno, location, collection)
            
            if (exitEarly(library, location, callno)) { return; }
            var holdingString = library + '$$' + location + '$$' + callno;
            console.log('hold', holdingString)
            var title = jQuery('.title').text().trim();
            $targetNode.data('title', title);
            allEntries.push($targetNode);
            allHoldings.push(holdingString);
        }); 

     
        if (allHoldings.length === 0) {return; }

        StackMap.requestHoldingData(allEntries, allHoldings);

    },
    requestHoldingData: function(entries, holdings) {
        jQuery.ajax({
            dataType: "json",
            url: StackMap.domain + "/json/?callback=?",
            timeout: 5000,
            data: {holding: holdings, alt: true},
            success: function(data, textStatus){
                
                for(var j = 0; j < entries.length; j++){
                    var result = data.results[j];
                    if(result.maps.length === 0){
                        continue;
                    }

                    var map = result.maps[0];
                    var header = entries[j].data('title') || (map.library + ', ' + map.floorname);
                    // generating the wrapper
                    var $popup = jQuery('<div>', {
                            'class': 'SMpopup',
                            'id': 'SM' + StackMap.popupCounter,
                            'data-callno': result.callno,
                            'data-location': result.location,
                            'data-library': result.library
                            
                            })
                        .append(
                            jQuery('<a href="#" style="text-decoration: none"><i class="fa fa-times SMclose fa-1x SMicon" aria-hidden="true" style="margin-right: 5px"></i></a>'),
                            jQuery('<a href="#" style="text-decoration: none"><i class="fa fa-print fa-1x SMprinter-friendly SMicon " aria-hidden="true" style="margin-right: 15px"></i></a>'),
                            jQuery('<div style="font-size: 14pt" class="SMheader"><h2 >' + header + '</h2></div>')
                        );

                    // generate the map
                    var $mapImg = jQuery('<img />', {'class': 'SMmap', alt: map.floorname});
                    if(StackMap.delayImgLoad){
                        $mapImg.attr('othersrc', map.mapurl + '&marker=1');
                    } else {
                        $mapImg.attr('src', map.mapurl + '&marker=1');
                    }

                    var $map = jQuery('<div>', {'class': 'SMmap-container'}).append(
                        jQuery('<ul>', {'class': 'SMmap-buttons'}).append(
                             jQuery('<li> <a class="zoom-in" href="javascript:void(0);" style="display: inline-block; position: relative; text-decoration: none"><i class="fa fa-plus-circle SMicon fa-1x" aria-hidden="true"></i><span> zoom in </span></a></li>'),
                        jQuery('<li> <a class="zoom-out" href="javascript:void(0);" style="display: inline-block; position: relative; text-decoration: none"><i class="fa fa-minus-circle SMicon fa-1x" aria-hidden="true"></i><span> zoom out</span></a></li>'),
                        jQuery('<li> <a class="zoom-fit" href="javascript:void(0);" style="display: inline-block; position: relative; text-decoration: none"><i class="fa fa-arrows SMicon fa-1x" aria-hidden="true"></i><span> Entire Map</span></a></li>')
                            ),
                        jQuery('<div>', {'class': 'SMmap-window', style: 'width: 680px; height: 510px;'}).append(
                            $mapImg,
                            jQuery('<div>', {'class': 'SMmap-overlay'})
                            )
                        );
                    
                    // add bubble text
/*  
                  for(var k = 0; k < map.ranges.length; k++){
                        var callnoText = 'Range ' + map.ranges[k].rangename + '<br />';
                        if(map.ranges[k].startcallno != '*'){
                            callnoText += map.ranges[k].startcallno + ' -<br /> ' + map.ranges[k].endcallno;
                        }

                        var callnoX = map.ranges[k].x - 10;
                        var callnoY = map.ranges[k].y - 45;

                        $map.find('.SMmap-overlay').append(jQuery('<div>',
                                    {'class': 'SMpin-target loc-x loc-y size-x size-y',
                                    x: callnoX,
                                    y: callnoY,
                                    style: 'left:' + callnoX + 'px; top:' + callnoY + 'px;"'})
                                .html('&nbsp;')
                                .attr('height', 44).attr('width', 25)
                                .append(jQuery('<div>',
                                        {'class': 'SMtooltip-contents', style: 'display:none;'})
                                    .html(callnoText)
                                    )
                                );
                    }
*/
                    // add sidebar
                    var $sidebar = jQuery('<div>', {'class': 'SMmore-info'});
                    var range = map.ranges[0].rangename;
                    


                    var $sidebarContents = jQuery('<ul>').append(
                            jQuery('<li><p><strong>Directions:</strong></p></li>'),
                        jQuery('<li><p class="SMemph">' +  map.directions  + '</p></li><br>'),
                        jQuery('<li>This pin <i class="fa fa-map-marker SMdirections" aria-hidden="true"></i> indicates your item\'s location on the map.<br /></li><br>'),
//                        jQuery('<li><p>Go to the shelving row labeled:</p></li>'),
//                        jQuery('<li ><p class="SMemph">' + range + '</p></li><br>'),
                        jQuery('<li><p>Look for the item with this call number: </p></li>'),
                        jQuery('<li><p class="SMemph">' + result.callno + '</p></li>')
                        );

                    $sidebar.append($sidebarContents);

                    $popup.append($map, $sidebar);
                    $popup.append(jQuery('<span class="SMpowered-by">Powered by <a target="_blank" href="http://stackmap.com">stackmap.com</a></span>'));
                    jQuery("body").append($popup);


                    var mapZoomer = new StackMapZoomMap(
                            {container: $popup.find('.SMmap-container'),
                            originalWidth: map.width, originalHeight: map.height});

                    // add "map it" button
        
                    entries[j].append('<td><button class="SMbutton SMsearchbtn" type="button" onclick="StackMap.showPopup(\'SM' + StackMap.popupCounter + '\');" ><i class="fa fa-map-marker" aria-hidden="true"></i> Map it</button></td>');
                    StackMap.popupCounter++;
                }
            }
        });
    },
    openPrinterFriendly: function(callno, location, library, title){
        var pfUrl = StackMap.domain + '/view/?callno=' + callno + '&amp;location=' + location.replace('&amp;', '%26') + '&amp;library=' + library + '&amp;title=' + title + '&amp;v=pf';
        window.open(pfUrl, 'stackmap', 'width=950,height=800,toolbar=no,directories=no,scrollbars=1,location=no,menubar=no,status=no,left=0,top=0');
        return false;
    },
    isClientMobile: function() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },
    showPopup: function(popupId){
        var $popup = jQuery('#' + popupId);

        if(!$popup.data('opened')){
            if(StackMap.delayImgLoad){
                var $mapImg = $popup.find('.SMmap');
                $mapImg.attr('src', $mapImg.attr('othersrc'));
            }
            var postData = {callno: $popup.data('callno'),
                    library: $popup.data('library'),
                    location: $popup.data('location'),
                    action: 'mapit'};
            jQuery.getJSON(StackMap.domain + "/logmapit/?callback=?", postData);  // TODO
            $popup.data('opened', true);
        }

        var left = Math.max(0, (jQuery(window).width() - 890) / 2 + jQuery(window).scrollLeft());
        $popup.css("top", (jQuery(window).scrollTop() + 10)  + "px")
               .css("left", left + "px").show();

        jQuery('#SMblock-screen').css('height', jQuery(document).height()).show();
    },
    hideAllPopups: function(e){
        e.preventDefault();
        jQuery('.SMpopup').hide();
        jQuery('#SMblock-screen').hide();
    }
};

jQuery(document).ready(StackMap.setup; window.alert("here"););

