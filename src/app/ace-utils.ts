declare let ace:any;

/**
 * ACE editors don't update their content when a parent DOM element is hidden. After
 * clicking on tabs (request body/response, response body/response) the ACE editors
 * should be notified to refresh their views
 */
export function refreshAceEditorsContent() {
    for (let aceEditor of $(".ace_editor").toArray()) {
        ace.edit(aceEditor).resize();
    }
}