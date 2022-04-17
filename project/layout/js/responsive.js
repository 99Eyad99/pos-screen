
function displayOrderPanel(){
        
  
    if($('body').width() < 1000 && $('.item-check').width() == 50){

        $('.item-check').css('z-index',2);
        $('.item-check').css('position','absolute');
        $('.item-check').css('background-color','white');
        $('.item-check').css('width', '100%' );
        $('.items-table').css('display','block');
        $('.checkout').css('display','block');
        $('.total-section').css('display','block');
    

        $('#panel-content').show();


    }
    else if($('body').width() < 1000 && $('.item-check').width() != 50){
        panelResetCss();
    }
    


}

function panelResetCss(){
    $('.item-check').css('z-index',1);
    $('.item-check').css('position','unset');
    $('.item-check').css('background-color','#dcdde1');
    $('.item-check').css('width', '50px' );
    $('.items-table').css('display','none');
    $('.checkout').css('display','none');
    $('.total-section').css('display','none');

}