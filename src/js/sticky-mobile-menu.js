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
    var smm = new stickymobilemenu("touchstart click");
    smm.addToggleEvent();
});

/*jQuery(window).load(function () {
    var smm = new stickymobilemenu("touchstart click");
    smm.addToggleEvent();
});*/

function stickymobilemenu(events) {

    /* Flags, Events, Classes and Selectors */
    this.toggleClicked = false;
    this.events = events;
    
    this.classes = {slide: "g-slide-out", sel: "g-selected", inac: "g-inactive", ac: "g-active"};
    this.selectors = {tMenu: ".g-toplevel", sMenu: ".g-sublevel", iMenu: ".g-menu-item",
                      dd: ".g-dropdown", ddc: ".g-dropdown-column", mmc: ".g-mobilemenu-container", 
                      oct: ".g-offcanvas-toggle", slide: "." + this.classes.slide,
                      sel: "." + this.classes.sel, ac: "." + this.classes.ac};
    this.selectors.iaMenu = this.selectors.iMenu + ".active";
    
    /* Helper Functions */
    this.mmSelector = function (cls){ return this.classes.mmc + " " + cls; };
    
    /* Offcanvas Opening */ 
    this.getToggleEvent = function (config){
        return function(){
            var lowest = 0;
            var $deepestItem;
            var $activeItem;    
            
            if(stickymobilemenu.memory && this.toggleClicked)
                return;
            else if(!this.toggleClicked)
                this.toggleClicked = true;
            
            $activeItem = jQuery(config.selectors.iaMenu);
            $activeItem.each(function() {
                var depth = jQuery(this).parents().length;
                if (depth > lowest) {
                    $deepestItem = jQuery(this);
                    lowest = depth;
                }
            });

            var $ddcMatch = $deepestItem.parents(config.selectors.ddc).first()
            var $topLevel = $ddcMatch.parents(config.selectors.tMenu).first();
            var $subLevels = $ddcMatch.parents(config.selectors.sMenu);
            var $menuItems = $ddcMatch.parents(config.selectors.iMenu);
            var $dropDowns = $ddcMatch.parents(config.selectors.dd);

            jQuery(config.mmSelector(config.selectors.slide)).removeClass(config.classes.slide);
            jQuery(config.mmSelector(config.selectors.sel)).removeClass(config.classes.sel);
            jQuery(config.mmSelector(config.selectors.ac)).removeClass(config.classes.ac);

            $topLevel.addClass(config.classes.slide);
            if($subLevels.length > 0)
                $subLevels.addClass(config.classes.slide);

            $menuItems.addClass(config.classes.sel);
            $dropDowns.removeClass(config.classes.inac);
            $dropDowns.addClass(config.classes.ac);
        };
    };
    
    this.addToggleEvent = function(option){
        jQuery(this.selectors.oct).on(this.events, this.getToggleEvent(this));
    };
};

