function relativeluminance($col) {
    //Remove any leading #
    $col = trim($col, '#');
    //Convert 3-digit to 6-digit
    if (strlen($col) == 3) {
        $col = $col[0] . $col[0] . $col[1] . $col[1] . $col[2] . $col[2];
    }
    //Convert hex to 0-1 scale
    $components = array(
        'r' => hexdec(substr($col, 0, 2)) / 255,
        'g' => hexdec(substr($col, 2, 2)) / 255,
        'b' => hexdec(substr($col, 4, 2)) / 255
    );
    //Correct for sRGB
    foreach($components as $c => $v) {
        if ($v <= 0.03928) {
            $components[$c] = $v / 12.92;
        } else {
            $components[$c] = pow((($v + 0.055) / 1.055), 2.4);
        }
    }
    //Calculate relative luminance using ITU-R BT. 709 coefficients
    return ($components['r'] * 0.2126) + ($components['g'] * 0.7152) + ($components['b'] * 0.0722);
}
