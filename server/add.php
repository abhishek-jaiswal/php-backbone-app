<?php
    include "config.php";

    $id = $_GET['id'];
    $type = $_GET['type'];
    $data = $_GET['data'];



    $validate = true;
    $validationError = array();

    if ($type === '') {
        $validate = false;
        $validationError[] = array(
            'target' => 'type_error', 
            'error'  => 'Type is required'
        );
    }

     if ($data === '') {
        $validate = false;
        $validationError[] = array(
            'target' => 'data_error', 
            'error'  => 'Data is required'
        );
    }  


    if ($validate === true) {
        if ( empty($id) ) 
        {
            $query = "INSERT INTO data (type, data) VALUE ('$type', '".htmlspecialchars($data,ENT_QUOTES)."')";

            $result = mysql_query($query);
            
            if($result)
            {
                exit(json_encode(array('success' => true, 'msg' => 'Saved!')));
            }

            
        } 
        elseif ( $id > 0 )
        {

             $query = "UPDATE data SET type = '$type', data = '".htmlspecialchars($data,ENT_QUOTES)."' WHERE id = '$id'";

             $result = mysql_query($query);

             if($result)
             {
                exit(json_encode(array('success' => true, 'msg' => 'Saved!')));
             }
             else{
                echo "Query failed\n<br><b>$query</b>\n";
                echo mysql_error(); // (Is that not the name)
             }


            
        }
    }
    echo json_encode(array(
        'success' => false, 
        'msg'     => 'there is a problem, please check ', 
        'validationError' => $validationError
    ));
    ?>
