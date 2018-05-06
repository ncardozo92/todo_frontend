$(function(){

    const windowHeight = window.innerHeight
    const footerHeight = Number($("footer").css("height").replace("px",""))
    const marginTopFooter = Number($("footer").css("margin-top").replace("px",""))
    const marginTopSection = Number($("section").css("margin-top").replace("px",""))
    const headerHeight = Number($("header").css("height").replace("px",""))

    $("section").css("min-height", ( windowHeight - ( marginTopSection + marginTopFooter + headerHeight + footerHeight) ))
    
})