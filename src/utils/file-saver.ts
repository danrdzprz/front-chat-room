export const saveAs = (data : Blob, filename: string) =>{
    let elm = document.createElement('a');  // CREATE A LINK ELEMENT IN DOM
    elm.href = URL.createObjectURL(data);  // SET LINK ELEMENTS CONTENTS
    elm.setAttribute('download', filename); // SET ELEMENT CREATED 'ATTRIBUTE' TO DOWNLOAD, FILENAME PARAM AUTOMATICALLY
    elm.click();    
}

export const GetFileName = ( response : Response) : string =>  {

    const header: string = response.headers.get('Content-Disposition')  || '';
    const filename = header.split(';').find(n => n.includes('filename='))?.replace('filename=', '').trim() || '';
    return filename;

}