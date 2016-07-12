Note, nothing in any file points at this typings_custom folder, nor the jquery.d.ts it contains. But our webpack configuration finds it because it ends in .ts.

jquery.d.ts is here because of an incompatibility in Angular with the use of '$'. Probably we can get rid of jquery use. But in the meantime, the typings file here has been changed to undefine $:

Modify jquery.d.ts and change:

    declare module "jquery" {
        export = $;
    }
    declare var jQuery: JQueryStatic;
    declare var $: JQueryStatic;


to:

    declare module "jquery" {
        export = jQuery;
    }
    declare var jQuery: JQueryStatic;

