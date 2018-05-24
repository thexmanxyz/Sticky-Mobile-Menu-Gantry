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

jQuery(document).ready(function () {
    var smm = new StickyMobileMenu("touchstart click");
    smm.addToggleEvent();
});

/*jQuery(window).load(function () {
    var smm = new StickyMobileMenu("touchstart click");
    smm.addToggleEvent();
});*/

function StickyMobileMenu(events) {

    /* Flags, Events, Classes and Selectors */
    this.toggleClicked = false;
    this.events = events;
    
    this.classes = {slide: "g-slide-out", sel: "g-selected", inac: "g-inactive", ac: "g-active"};
    this.selectors = {tMenu: ".g-toplevel", sMenu: ".g-sublevel", iMenu: ".g-menu-item",
                      dd: ".g-dropdown", ddc: ".g-dropdown-column", oct: ".g-offcanvas-toggle", 
                      mmc: "#g-mobilemenu-container", slide: "." + this.classes.slide,
                      sel: "." + this.classes.sel, ac: "." + this.classes.ac};
    this.selectors.iaMenu = this.selectors.iMenu + ".active";
    
    /* Helper Functions */
    this.mmSelector = function (cls){ return this.selectors.mmc + " " + cls; };
    
    /* Offcanvas Opening */ 
    this.getToggleEvent = function (config){
        return function(){
            var lowest = 0;
            var $deepestItem;
            var $activeItem;  
            var cSel = config.selectors;
            var cCls = config.classes;
            
            if(StickyMobileMenu.memory && this.toggleClicked)
                return;
            else if(!this.toggleClicked)
                this.toggleClicked = true;
            
            $activeItem = jQuery(cSel.iaMenu);
            $activeItem.each(function() {
                var depth = jQuery(this).parents().length;
                if (depth > lowest) {
                    $deepestItem = jQuery(this);
                    lowest = depth;
                }
            });

            var $ddcMatch = $deepestItem.parents(cSel.ddc).first()
            var $topLevel = $ddcMatch.parents(cSel.tMenu).first();
            var $subLevels = $ddcMatch.parents(cSel.sMenu);
            var $menuItems = $ddcMatch.parents(cSel.iMenu);
            var $dropDowns = $ddcMatch.parents(cSel.dd);

            jQuery(config.mmSelector(cSel.slide)).removeClass(cCls.slide);
            jQuery(config.mmSelector(cSel.sel)).removeClass(cCls.sel);
            jQuery(config.mmSelector(cSel.ac)).removeClass(cCls.ac);

            $topLevel.addClass(cCls.slide);
            if($subLevels.length > 0)
                $subLevels.addClass(cCls.slide);

            $menuItems.addClass(cCls.sel);
            $dropDowns.removeClass(cCls.inac);
            $dropDowns.addClass(cCls.ac);
        };
    };
    
    this.addToggleEvent = function(option){
        jQuery(this.selectors.oct).on(this.events, this.getToggleEvent(this));
    };
};

