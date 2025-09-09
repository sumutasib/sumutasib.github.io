// Javascript utilities for Sumu Tasib website
// Author: Sumu Tasib

// Function to close the password dialog box and set WordSection1 to visible
function closePasswordDialog(hashvalue) {
    // password can be passed in (old style) or picked up from a hidden field (new style)
    if (hashvalue == null) {
        // get the password from the input box
        var hashvalue = document.getElementById("hashcode").innerHTML;
    }
    var password = document.getElementById("storyPassword").value;
    // get the hash of the password
    var hash = hashCode(password);
    // check if the hash matches the hashvalue
    if (hash == hashvalue) {
        // document.getElementByClass("WordSection1").style.visibility = "visible";
        document.getElementById("storyPasswordDialog").style.display = "none";
        // find sections with class WordSection1 and set visibility to visible
        var sections = document.getElementsByClassName("WordSection1");
        for (var i = 0; i < sections.length; i++) {
            sections[i].style.visibility = "visible";
        }
        // find sections with class MsoNormal and obfuscate/deobfuscate the text
        var sections = document.getElementsByClassName("MsoNormal");
        for (var i = 0; i < sections.length; i++) {
            deObfuscateElementText(sections[i], password);
        }
    } else {
        // clear the password input box
        document.getElementById("storyPassword").value = "";
        // set passwordDialogText to "Incorrect password. Please try again."
        document.getElementById("passwordDialogText").innerHTML = "Incorrect password. Please try again.";
    }
}

// function to create a numeric hash from a string. Intentionally simple with a high chance of collisions
// so that it does not provide a hint to the true passphrase, which will be required to decode correctly,
// i.e., matching the hash will not be enough to decode the text.
function hashCode(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash += str.charCodeAt(i)*(i+1);
    }
    // return the lowest 8 bits to reduce the information content of the hash
    return hash & 0xFF;
}

// more complex hash
function hashCode_old(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        var char = str.charCodeAt(i);
        hash = char + (hash << 6) + (hash << 16) - hash;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

// function to add the ASCII values from a passphrase (round-robin) to the characters of a string
function addPassphraseCharsToString(str, passphrase) {
    // create an array of values from the passphrase
    var passphrase_values = [];
    for (var i = 0; i < passphrase.length; i++) {
        passphrase_values.push(passphrase.charCodeAt(i));
    }

    var newStr = "";
    for (var i = 0; i < str.length; i++) {
        var char_val = str.charCodeAt(i) + passphrase_values[i % passphrase_values.length];
        newStr += char_val + ", ";
    }
    // remove the last comma and space
    newStr = newStr.slice(0, -2);
    return newStr;
}

// function to subtract the ASCII values from a passphrase (round-robin) from the characters of a string
// (the inverse of addPassphraseCharsToString)
function removePassphraseCharsFromString(str, passphrase) {
    // create an array of values from the passphrase
    var passphrase_values = [];
    for (var i = 0; i < passphrase.length; i++) {
        passphrase_values.push(passphrase.charCodeAt(i));
    }
    // split the string into an array of numbers
    var num_strings = str.split(", ");
    var newStr = "";
    for (var i = 0; i < num_strings.length; i++) {
        var char_val = parseInt(num_strings[i]) - passphrase_values[i % passphrase_values.length];
        newStr += String.fromCharCode(char_val);
    }
    return newStr;
}

// function to add an integer to the value of each character in an element
function obfuscateElementText(element, passphrase) {
    element.innerHTML = addPassphraseCharsToString(element.innerHTML, passphrase);
}

function deObfuscateElementText(element, passphrase) {
    element.innerHTML = removePassphraseCharsFromString(element.innerHTML, passphrase);
}

// function to show the password hash value and obfuscate the text, logging the result to console
function obfuscateArticleTextToConsole(passphrase) {
    var hash = hashCode(passphrase);
    console.log("Hash value: " + hash);
    // find sections with class MsoNormal and obfuscate the text
    var sections = document.getElementsByClassName("MsoNormal");
    for (var i = 0; i < sections.length; i++) {
        obfuscateElementText(sections[i], passphrase);
    }
    // print the obfuscated text to console
    console.log(document.getElementById("ArticleText").innerHTML);
}

// function to deobfuscate the text and log the result to console
function deObfuscateArticleTextToConsole(passphrase) {
    // find sections with class MsoNormal and obfuscate the text
    var sections = document.getElementsByClassName("MsoNormal");
    for (var i = 0; i < sections.length; i++) {
        deObfuscateElementText(sections[i], passphrase);
    }
    // print the obfuscated text to console
    console.log(document.getElementById("ArticleText").innerHTML);
}
