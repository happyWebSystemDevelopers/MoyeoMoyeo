<template>
<div id="wholeWrapper">
    <div style="letter-spacing: 10px; font-size: 20px; font-style: oblique">MEET US</div>

    <div id="Box">
            <div id="imageBox">
            <img id = "developer" src="../../public/images/595811_1140x516.jpg">
            </div>
            <div id="developerTable">
                <table width="100%">
                    <th>Name</th>
                    <th>Contact</th>
                    <br>
                    <tr class ="linedBoard">
                        <td align="center" style ="color : #566270;">Nahyun Kim</td>
                        <td align="center" style ="color : #566270;">nahyun858@ajou.ac.kr</td>
                    </tr>
                    <tr class ="linedBoard">
                        <td align="center" style ="color : #566270;">Jeongwu Song</td>
                        <td align="center" style ="color : #566270;">nahyun858@ajou.ac.kr</td>
                    </tr>
                    <tr class ="linedBoard">
                        <td align="center" style ="color : #566270;">Yeongin Park</td>
                        <td align="center" style ="color : #566270;">pyi7628@ajou.ac.kr</td>
                    </tr>
                    <tr class ="linedBoard">
                        <td align="center" style ="color : #566270;">Sooyoung Kim</td>
                        <td align="center" style ="color : #566270;">youworthit17@ajou.ac.kr</td>
                    </tr>
                </table>
            </div>
        </div>
</div>
</template>

<script>

</script>

<style>
    #developer{
        width: 80%;
        margin:auto;
    }
    #Box{
        border:3px solid #566270;
        height: auto;
        width: auto;
        margin-left:200px;
        margin-right:200px;
        align-content: center;
        text-align: center;
        margin-top:30px;

    }
    #imageBox{
        width: auto;
        text-align: center;
        margin: auto;
        padding: 10px;
        border: 0.5px solid;
        border-color: #dddfe6;
        background: #dddfe6;
    }
    #developerTable{
        text-align: center;
        width: auto;
        /*margin-left: 250px;*/
        margin: auto;
        border: 1px solid;
        border-color: #dddfe6;
    }
#wholeWrapper{
    text-align: center;
}
</style>