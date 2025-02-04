/**
 * @name          form input html select file in Google Drive
 * @fileoverview  Form HTML input type select using to get file in Google Drive
 * @author        Bitts
 * @version       1.0
 * @changelog
 * - version 1.0 [2024-09-09]
 *   - Released initial version.
 *   - create exemple
 */

function doGet(request) {
  return init(request)
}

function doPost(request){
  return init(request)
}

PropertiesService.getUserProperties().setProperties({
  'DEBUG': true, 
  'VERSION' :  JSON.stringify({
    'numero': '1.0.0', 
    'data': '31/01/2025',
    'create': 'Create by Bitts'
  })
});


function init(){
  var template = HtmlService.createTemplateFromFile('selectFile');
  template.dados = {
    'debug' : PropertiesService.getUserProperties().getProperty('DEBUG'),
    'title' : 'Teste'
  }
  return template.evaluate();
}

function getFiles(e, rootFolderId) {
  var data = {};
  var idn = e;
  e = e == "root" ? DriveApp.getRootFolder().getId() : e;
  data[e] = {};
  data[e].keyname = DriveApp.getFolderById(e).getName();
  data[e].keyparent = (idn == rootFolderId ? null : (DriveApp.getFolderById(e).getParents().hasNext() ? DriveApp.getFolderById(e).getParents().next().getId() : null));
  data[e].files = [];
  var da = idn == "root" ? DriveApp.getRootFolder() : DriveApp.getFolderById(e);
  var folders = da.getFolders();
  var files = da.getFiles();
  while (folders.hasNext()) {
    var folder = folders.next();
    data[e].files.push({name: folder.getName(), id: folder.getId(), mimeType: "folder"});
  }
  while (files.hasNext()) {
    var file = files.next();
    data[e].files.push({name: file.getName(), id: file.getId(), mimeType: file.getMimeType()});
  }
  return data;
}
