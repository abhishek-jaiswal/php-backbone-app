<?php  

    include "config.php";

    if(isset($_GET['full_name']))
    {
        $full_name = $_GET['full_name'];
                $query = "SELECT * FROM data WHERE data LIKE '$full_name%' ORDER BY id DESC";

    }
    else
    {
                $query = "SELECT * FROM data ORDER BY id DESC";
        
    }

        
    


    $data = array();

    


    $result = mysql_query($query);
    $i=0;
    while($row = mysql_fetch_array($result)):
        $data[] = array(
            'id' => $row['id'],
            'type' => $row['type'], 
            'data' => $row['data'],
            'date' => $row['ts']
        );
        $i++;
    endwhile;

echo json_encode($data);

?>

