function start() {
    Tools.connect();
    Tools.initialize();
    Tools.page.initializeElements();
    Tools.page.toggleConnection();
}
