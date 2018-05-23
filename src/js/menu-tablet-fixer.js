/******************************************************
*                                                     *
*   Sticky Mobile Menu - Atom for Gantry              *
*                                                     *
*   Purpose: This project modifies the default        *
*            mobile menu behavior. Hence, a click     *
*            on the hamburger menu always shows       *
*            the current selected sub menu items      *
*            instead the root menu items.             *
*                                                     *
*   Author: Andreas Kar (thex) <andreas.kar@gmx.at>   *
*                                                     *
******************************************************/

jQuery(window).load(function () {
    var openCls = "g-touch-open";
    var activeCls = "g-active";
    var selectedCls = "g-selected";
    
    var openClsSel = "." + openCls;
    var activeClsSel = "." + activeCls;
    var selectedClsSel = "." + selectedCls;
    
    var activeSel = "li > ul.g-active";
    var menuSel = ".g-main-nav.g-menu-hastouch %s > li > a";
    
    var topSel = menuSel.replace("%s", ".g-toplevel");
    var subSel = menuSel.replace("%s", ".g-sublevel");

    jQuery(topSel + ", " + subSel).click(function(e) {
            var subItem = jQuery(this).parent().children(activeSel);
            var deselect = function(cls, selector){
                jQuery(selector).each(function() {
                    $this = jQuery(this);    
                    if (!$this.parents(openClsSel).length && !$this.find(openClsSel).length && !$this.hasClass(openCls))
                             $this.removeClass(cls);
                });
            };
            
            if(subItem.length > 0){
                if(!subItem.hasClass(openCls) ){
                    jQuery(openClsSel).removeClass(openCls);
                    subItem.addClass(openCls);
                    deselect(activeCls, activeClsSel);
                    deselect(selectedCls, selectedClsSel);
                    e.preventDefault();
                }else{
                    subItem.removeClass(openCls);
                }
            }
    });
});
