function withScript(url, condition, callback) {
    if (condition()) {
        (function () {
            var script = document.createElement("script");
            script.src = url;
            var head = document.getElementsByTagName("head")[0],
                done = !1;
            script.onload = script.onreadystatechange = function () {
                if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
                    done = !0;
                    script.onload = script.onreadystatechange = null;
                    head.removeChild(script);
                    callback();
                }
            };
            head.appendChild(script);
        })();
    } else {
        callback();
    }
}

function translate() {
    var className = "nlentranslate";
    var elements = jQuery("." + className);
    if (elements.size() != 0) {
        elements.remove();
        return;
    }
    var sel = window.getSelection();
    if (sel.rangeCount < 1) {
        return;
    }
    var arr = sel.toString().split(". ");
    jQuery.get("https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20160314T094828Z.9a4a9946c1276589.fc095296bcade3d9bb27e3ea480669b939bf4f9f&lang=nl-en&text="
            + arr.join("&text="), function (resp) {
        var div = document.createElement("p");
        div.innerHTML = resp.text.join(". ");
        div.className = "nlentranslate";
        div.style.cssText = "font-size:60%;color:rgb(67,175,1);line-height:normal";
        var range = sel.getRangeAt(0);
        range.collapse(false);
        range.insertNode(div);
    });
}

withScript("https://code.jquery.com/jquery.min.js", function() {
    return typeof jQuery == "undefined";
}, translate);
