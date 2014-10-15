<?php
$back_html = '<div style="margin: 0 auto; text-align: center; font-weight: bold; font-size:14px; text-decoration:underline;">CUSTOMS AND BORDER PROTECTION OFFICER\'S REPORT</div>'
.'<p style="text-align: right;">Date:- </p>'
.'<div style="margin: 0 auto; text-align: left; font-weight: bold; font-size:14px;">'
.'MANIPULATION COMPLETED AS REQUESTED: When goods are repacked the CBP (warehouse) officer will report'
.'hereon the marks and numbers of packages repacked and the marks and numbers of packages and the weights or '
.'guage of same after repacking. <br><br></div>'
.'<table style="border-collapse:collapse; width: 100% "> ';

	for($i=0;$i<10;$i++) {
		$td = '';
		for($j=0;$j<=4;$j++) {
			$width = ($j==2 ? '60%' : '15%');
			$col = ($j==2 ? '60' : '20');
			$td .='<td style="border:1px solid black; width:'.$width.'"><textarea cols="'.$col.'" name="'.$i.$j.'" rows="3"  ></textarea></td>';
		}
		$back_html .= '<tr>'.$td.'</tr>';
	}


	$back_html.= '<tr><td colspan="3">(CBP Officer and Title) <br/> <br/> <textarea cosl="140" name="cbp"></textarea></td></tr>';


	$back_html .= '</table>';

	echo $back_html;
