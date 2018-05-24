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
    jQuery(".g-offcanvas-toggle").on('touchstart click', setMobileMenuOpen);
});

/*jQuery(window).load(function () {
    jQuery(".g-offcanvas-toggle").on('touchstart click', setMobileMenuOpen);
});*/

function setMobileMenuOpen(){
    var slideCls = "g-slide-out";
    var selCls = "g-selected";
    var inacCls = "g-inactive";
    var acCls = "g-active";

    var slideClsSel = "." + slideCls;
    var selClsSel = "." + selCls;
    var acClsSel = "." + acCls;

    var topMSel = ".g-toplevel";
    var subMSel = ".g-sublevel";
    var ddCSel = ".g-dropdown-column";
    var ddSel = ".g-dropdown";
    
    var mItmSel = ".g-menu-item";
    var aMItmSel = mItmSel + ".active";

    var lowest = 0;
    var $deepestItem;
    
    var $activeItem = jQuery(aMItmSel);

    $activeItem.each(function() {
        var depth = jQuery(this).parents().length;
        if (depth > lowest) {
            $deepestItem = jQuery(this);
            lowest = depth;
        }
    });

    var $nextDDC = $deepestItem.parents(ddCSel)
    var $topLevel = $nextDDC.parents(topMSel);
    var $subLevel = $nextDDC.parents(subMSel);
    var $dropDown = $nextDDC.parents(ddSel);
    var $menuItem = $nextDDC.parents(mItmSel);
    
    jQuery(slideClsSel).removeClass(slideCls);
    jQuery(selClsSel).removeClass(selCls);
    jQuery(acClsSel).removeClass(acCls);

    if($subLevel.length > 0)
        $subLevel.addClass(slideCls);

    $topLevel.addClass(slideCls);
    $dropDown.removeClass(inacCls);
    $dropDown.addClass(acCls);
    $menuItem.addClass(selCls);
}