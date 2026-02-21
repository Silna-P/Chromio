
(function() {
    function applyChromio() {
        if (!window.frappe) return;

        frappe.call({
            method: "frappe.client.get_single_value",
            args: { doctype: "Chromio Settings", field: "navbar_background_color" },
            callback: function(r1) {
                frappe.call({
                    method: "frappe.client.get_single_value",
                    args: { doctype: "Chromio Settings", field: "breadcrumb_text_color" },
                    callback: function(r2) {
                        var style = "";

                        // Navbar color
                        if (r1.message) {
                            style += `
                                .navbar {
                                    background-color: ${r1.message} !important;
                                }
                                .navbar input, .navbar .form-control {
                                    background-color: #ffffff !important;
                                    color: #000000 !important;
                                }
                            `;
                        }

                        // Breadcrumb color
                        if (r2.message) {
                            style += `
                                #navbar-breadcrumbs a,
                                #navbar-breadcrumbs li,
                                #navbar-breadcrumbs span {
                                    color: ${r2.message} !important;
                                }
                            `;
                        }

                        // Always hide Help menu
                        style += `
                            .dropdown-help,
                            .nav-item.dropdown-help {
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
            }
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", applyChromio);
    } else {
        applyChromio();
    }

    if (window.frappe) {
        frappe.after_ajax && frappe.after_ajax(applyChromio);
    }
})();
