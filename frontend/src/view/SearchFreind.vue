<template>
    <div>
        <div id="selectBox"> <!--검색 조건 묶어놓은 박스-->
            <span>Name : </span><input v-model="selectedName" placeholder="Name" class="searchOpt1"> <!--이름으로 검색-->
            <span>Nickname : </span><input v-model="selectedNickname" placeholder="Nickname" class="searchOpt1"> <!--닉네임으로 검색-->
            <span>Country : </span>
            <select v-model="selectedCountry" class="searchOpt2"> <!--나라로 검색-->
                <option selected>----</option>
                <option v-for="country in countries" :key ="country.name" value="title" selected>{{ country.name }}</option>
            </select>
            <span>University : </span>
            <select v-model="selectedUniversity" class="searchOpt2"> <!--대학교로 검색-->
                <option selected>----</option>
                <option v-for="university in universities" :key ="university.name" value="title" selected>{{ university.name }}</option>
            </select>
            <span>Major : </span>
            <select v-model="selectedMajor" class="searchOpt2"> <!--전공으로 검색-->
                <option selected>----</option>
                <option v-for="major in majors" :key ="major.name" value="title" selected>{{ major.name }}</option>
            </select>
        </div>
        <br>
        <div id="searchedResult"> <!--검색 결과 표시하는 박스-->
            <table width="100%">
                <th>Name</th>
                <th>Nickname</th>
                <th>Country</th>
                <th>University</th>
                <th>Major</th>
                <tr class ="linedBoard" v-for ="searchedPerson in searchedPeople" :key ="searchedPerson.title">
                    <td align="center" style ="color : #566270;">{{ searchedPerson.name }}</td>
                    <td align="center" style ="color : #566270;">{{ searchedPerson.nickname }}</td>
                    <td align="center" style ="color : #566270;">{{ searchedPerson.country }}</td>
                    <td align="center" style ="color : #566270;">{{ searchedPerson.university }}</td>
                    <td align="center" style ="color : #566270;">{{ searchedPerson.major }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return{
                people: [], //전체 유저 데이터
                countries : [], //전체 나라 목록
                majors : [],
                universities : [],
                selectedName : '',
                selectedNickname: '',
                selectedCountry: '----', //검색 조건으로 사용하는 나라
                selectedMajor: '----',
                selectedUniversity: '----',
                searchedPeople: [] //검색 조건에 부합하는 사람들.
            }
        },
        // 여기 검색 조건에 맞는 사람들 필터링하는거 추가해야됨.
    }
</script>

<style>
    #selectBox{ /*검색 조건들 들어있는 박스. 1개*/
        width: 1000px;
        text-align: center;
        margin-left: 250px;
        padding: 10px;
        border: 0.5px solid;
        border-color: #dddfe6;
        background: #dddfe6;
    }
    .searchOpt1{ /*검색 조건중 이름, 닉네임. 얘네만 크기가 달라서 분류해둠. 2개*/
        width: 100px;
        height: 24px;
        margin: 10px;
    }
    .searchOpt2{ /*검색 조건중 나라, 대학, 전공. 3개*/
        width: 100px;
        height: 30px;
        margin: 10px;
    }
    #searchedResult{ /*검색 결과 담아놓은 박스. 1개*/
        text-align: center;
        width: 1020px;
        margin-left: 250px;
        border: 1px solid;
        border-color: #dddfe6;
    }
</style>