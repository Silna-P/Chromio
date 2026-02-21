
frappe.after_ajax(function () {
    frappe.call({
        method: "frappe.client.get",
        args: {
            doctype: "Chromio Settings",
            name: "Chromio Settings"
        },
        callback: function (r) {
            if (!r.message) return;
            var doc = r.message;
            var style = "";

            // 1. Navbar background color
            if (doc.navbar_background_color) {
                style += `
                    .navbar {
                        background-color: ${doc.navbar_background_color} !important;
                    }
                    .navbar input,
                    .navbar .form-control {
                        background-color: #ffffff !important;
                        color: #000000 !important;
                    }
                `;
            }

            // 2. Breadcrumb color - exact selector from HTML
            // id="navbar-breadcrumbs" contains <li> and <a> tags
            if (doc.breadcrumb_text_color) {
                style += `
                    #navbar-breadcrumbs li a,
                    #navbar-breadcrumbs li,
                    #navbar-breadcrumbs a {
                        color: ${doc.breadcrumb_text_color} !important;
                    }
                `;
            }

            // 3. Hide Help - exact class from HTML: dropdown-help
            style += `
                .dropdown-help,
                .nav-item.dropdown.dropdown-help {
                    display: none !important;
                }
            `;

            var tag = document.getElementById("chromio-style");
            if (!tag) {
                tag = document.createElement("style");
                tag.id = "chromio-style";
                document.head.appendChild(tag);
            }
            tag.innerHTML = style;
        }
    });
});



frappe.ready(function () {
    frappe.call({
        method: "frappe.client.get",
        args: {
            doctype: "Chromio Settings",   // Change if your doctype name is different
            name: "Chromio Settings"
        },
        callback: function (r) {
            if (!r.message) return;

            let settings = r.message;

            // Hide Help Menu if checkbox enabled
            if (settings.hide_help_menu) {
                let helpMenu = document.querySelector('[data-label="Help"]');
                if (helpMenu) {
                    helpMenu.closest('li, .dropdown, .nav-item').style.display = 'none';
                }

                // Alternative selector for Frappe v15
                let helpDropdown = document.querySelector('.dropdown-help');
                if (helpDropdown) {
                    helpDropdown.style.display = 'none';
                }
            }
        }
    });
});