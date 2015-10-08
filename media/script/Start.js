function start() {
    Tools.connect();
    Tools.msgCreator.initialize();
    Tools.page.initializeElements();
    Tools.page.toggleConnection();
}
