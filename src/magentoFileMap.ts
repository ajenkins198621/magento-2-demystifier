import { FileMap } from "./types";

const magentoFileMapDictionary : FileMap = {
    'app': {
        isEditable: true,
        title: "Application Code",
        description: "Contains Magento's core code and modules. This is where custom modules, themes, and configuration files reside. Editing is common here, especially for custom development.",
        files: {

        },
        subDirectories: {
            'code': {
                isEditable: true,
                title: "Code",
                description: "Contains Magento's code. Editing is common here.",
                files: {

                },
                subDirectories: {
                    '*': {
                        isEditable: true,
                        title: "Vendor: *",
                        description: "Contains Magento's vendor code. Editing is common here.",
                        files: {

                        },
                        subDirectories: {
                            '*': {
                                isEditable: true,
                                title: "Module: *",
                                description: "Contains Magento's module code. Editing is common here.",
                                files: {

                                },
                                subDirectories: {
                                    'Controller': {
                                        isEditable: true,
                                        title: "Controller",
                                        description: "Contains Magento's controller code. Controllers are responsible for handling requests and returning responses. Editing is common here.",
                                        files: {

                                        },
                                        subDirectories: {
                                            '*': {
                                                isEditable: true,
                                                title: "Controller: *",
                                                description: "Individual controllers. Editing is common here.",
                                                files: {
                                                    '*.php': {
                                                        isEditable: true,
                                                        title: "Controller: *.php",
                                                        description: "Individual controllers. Editing is common here.",
                                                    }
                                                },
                                                subDirectories: {

                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    }
                }
            },
        },
    },
    'bin': {
        isEditable: false,
        title: "Bin",
        description: "Contains Magento's command line tools. Editing is not common here.",
        files: {

        },
        subDirectories: {

        },
    },
    'dev': {
        isEditable: false,
        title: "Dev",
        description: "Contains Magento's development tools. Editing is not common here.",
        files: {

        },
        subDirectories: {

        },
    },
    'generated': {
        isEditable: false,
        title: "Generated",
        description: "Contains generated code. Editing is not common here.",
        files: {

        },
        subDirectories: {

        },
    },
    'lib': {
        isEditable: false,
        title: "Lib",
        description: "Contains Magento's core libraries. Editing is not common here.",
        files: {

        },
        subDirectories: {

        },
    },
    'phpserver': {
        isEditable: false,
        title: "PHP Server",
        description: "Contains Magento's PHP server. Editing is not common here.",
        files: {

        },
        subDirectories: {

        },
    },
    'pub': {
        isEditable: false,
        title: "Pub",
        description: "Contains Magento's publicly accessible files. Editing is not common here.",
        files: {

        },
        subDirectories: {

        },
    },
    'setup': {
        isEditable: false,
        title: "Setup",
        description: "Contains Magento's setup files. Editing is not common here.",
        files: {

        },
        subDirectories: {

        },
    },
    'update': {
        isEditable: false,
        title: "Update",
        description: "Contains Magento's update files. Editing is not common here.",
        files: {

        },
        subDirectories: {

        },
    },
    'var': {
        isEditable: false,
        title: "Var",
        description: "Contains Magento's variable files. Editing is not common here.",
        files: {

        },
        subDirectories: {

        },
    },
    'vendor': {
        isEditable: false,
        title: "Vendor",
        description: "Contains Magento's vendor files. Editing is not common here.",
        files: {

        },
        subDirectories: {

        },
    },
};

export default magentoFileMapDictionary;