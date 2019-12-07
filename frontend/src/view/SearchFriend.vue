<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div id="searchBox">
        <div id="selectBox"> <!--검색 조건 묶어놓은 박스-->
            <span>Name : </span><input v-model="selectedName" @change="onChange($event)" placeholder="Name" class="searchOpt1"> <!--이름으로 검색-->
            <span>Nickname : </span><input v-model="selectedNickname" @change="onChange1($event)" placeholder="Nickname" class="searchOpt1"> <!--닉네임으로 검색-->
            <span>Country : </span>
            <select v-model="selectedCountry" class="searchOpt2" @change="onChange2($event)"> <!--나라로 검색-->
                <option selected>----</option>
                <option v-for="country in countries" :key ="country.name" v-bind:value="country.name" selected>{{ country.name }}</option>
            </select>
            <span>University : </span>
            <select v-model="selectedUniversity" class="searchOpt2" @change="onChange3($event)"> <!--대학교로 검색-->
                <option selected>----</option>
                <option v-for="university in universities" :key ="university.name" v-bind:value="university.name" selected>{{ university.name }}</option>
            </select>
            <br>
            <span>Major (with UniversityName & UniversityCampusName & major) : </span>
            <select v-model="selectedUniversity" class="searchOpt2"> <!--대학교로 검색-->
                <option selected>----</option>
                <option v-for="university in universities" :key ="university.name" v-bind:value="university.name" selected>{{ university.name }}</option>
            </select>
            <select v-model="resultUniindex" class="searchOpt2" @change="UItoM($event)"> <!--대학교 campus+ -->
                <option selected>----</option>
                <option v-for="uindex in uniindex" :key ="uindex.nameindex" v-bind:value="uindex.nameindex" selected>{{uindex.nameindex}}</option>
            </select>
            <select v-model="selectedMajor" class="searchOpt2" @change="onChange4($event)"> <!--대학, campus 선택 이후 전공으로 검색-->
                <option selected>----</option>
                <option v-for="major in majors" :key ="major.major" v-bind:value="major.major" selected>{{ major.major }}</option>
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
                <th>Email</th>
                <tr class ="linedBoard" v-for ="searchedPerson in searchedPeople" :key ="searchedPerson.title">
                    <td align="center" style ="color : #566270;">{{ searchedPerson.name }}</td>
                    <td align="center" style ="color : #566270;">{{ searchedPerson.nickname }}</td>
                    <td align="center" style ="color : #566270;">{{ searchedPerson.country }}</td>
                    <td align="center" style ="color : #566270;">{{ searchedPerson.universityName }}</td>
                    <td align="center" style ="color : #566270;">{{ searchedPerson.major }}</td>
                    <td align="center" style ="color : #566270;">{{ searchedPerson.email}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data () {
            return{
                people: [], //전체 유저 데이터
                countries : [{}], //전체 나라 목록
                majors : [{}],
                universities : [{}],
                selectedName : '',
                selectedNickname: '',
                selectedCountry: '', //검색 조건으로 사용하는 나라
                selectedMajor: '',
                selectedUniversity: '',
                searchedPeople: [{}], //검색 조건에 부합하는 사람들.
                resultUniindex : '', //전공이랑 같이 검색하는 대학교 캠퍼스 이름
                uniindex:[{}], // 대학교 캠퍼스

            }
        },
        created: function(){
            //전체 나라 목록 가져오기
            axios.get('/api/universityList/country')
                .then((response)=>{
                    this.countries = response.data;
                });
            //전체 학교 목록 가져오기
            axios.get('/api/universityList/name')
                .then((response)=>{
                    this.universities = response.data;
                });
            //무조건 학교 고른 이후에 major 선택을 하게 한다.

        },
        methods:{
            //university 를 골랐을때 campus 도 선택
            //campus 선택 이후 major 선택
            UItoM(event){
                var UNAME = this.selectedUniversity;
                var UNAMEINDEX = event.target.value;
                axios.get('/api/universityList/major/'+UNAME+'/'+UNAMEINDEX)
                    .then((response)=>{
                        this.majors = response.data;
                        this.resultUniindex = event.target.value;
                    })
            },

            //이름으로 검색 //대신 창에서 아무데나 눌러야 목록이뜸..
            onChange(event){
                this.searchedPeople = [{}];
                this.selectedName = event.target.value;
                var nickname = this.selectedNickname;
                var country = this.selectedCountry;
                var university = this.selectedUniversity;
                var majorUniversityIndex = this.resultUniindex;
                var major = this.selectedMajor;

                if(this.selectedName.length != 0) {
                    //  posting();
                    axios.post('/api/users/postByWhole', {
                            name: event.target.value,
                            nickname: nickname,
                            country: country,
                            university: university,
                            majorUniversityIndex: majorUniversityIndex,
                            major: major,
                        }
                    ).then(response=>{
                        this.searchedPeople = response.data;
                    })
                }
            },
            onChange1(event){
                this.searchedPeople = [{}];
                this.selectedNickname= event.target.value;
                var name = this.selectedName;
                var country = this.selectedCountry;
                var university = this.selectedUniversity;
                var majorUniversityIndex = this.resultUniindex;
                var major = this.selectedMajor;

                if(this.selectedNickname.length != 0) {
                    //  posting();
                    axios.post('/api/users/postByWhole', {
                            name: name,
                            nickname: event.target.value,
                            country: country,
                            university: university,
                            majorUniversityIndex: majorUniversityIndex,
                            major: major,
                        }
                    ).then(response=>{
                        this.searchedPeople = response.data;
                    })
                }
            },
            onChange2(event){
                this.searchedPeople = [{}];
                this.selectedCountry = event.target.value;
                var name  = this.selectedName;
                var nickname = this.selectedNickname;
                var country = event.target.value;
                var university = this.selectedUniversity;
                var majorUniversityIndex = this.resultUniindex;
                var major = this.selectedMajor;

                if(this.selectedCountry.length != 0) {
                    //  posting();
                    axios.post('/api/users/postByWhole', {
                            name: name,
                            nickname: nickname,
                            country: country,
                            university: university,
                            majorUniversityIndex: majorUniversityIndex,
                            major: major,
                        }
                    ).then(response=>{
                        this.searchedPeople = response.data;
                    })
                }
            },
            onChange3(event){
                this.searchedPeople = [{}];
                var UNAME = event.target.value;
                axios.get('/api/universityList/nameindex/'+UNAME)
                    .then((response)=>{
                        this.uniindex = response.data;
                        this.selectedUniversity = event.target.value;
                    });
                var name  = this.selectedName;
                var nickname = this.selectedNickname;
                var country = this.selectedCountry;
                var university = event.target.value;
                var majorUniversityIndex = this.resultUniindex;
                var major = this.selectedMajor;

                if(this.selectedUniversity.length != 0) {
                    //  posting();
                    axios.post('/api/users/postByWhole', {
                            name: name,
                            nickname: nickname,
                            country: country,
                            university: university,
                            majorUniversityIndex: majorUniversityIndex,
                            major: major,
                        }
                    ).then(response=>{
                        this.searchedPeople = response.data;
                    })
                }
            },
            onChange4(event){
                this.searchedPeople = [{}];
                this.selectedMajor= event.target.value;
                var name  = this.selectedName;
                var nickname = this.selectedNickname;
                var country = this.selectedCountry;
                var university = this.selectedUniversity;
                var majorUniversityIndex = this.resultUniindex;
                var major = event.target.value;

                if(this.selectedMajor.length != 0) {
                    //  posting();
                    axios.post('/api/users/postByWhole', {
                            name: name,
                            nickname: nickname,
                            country: country,
                            university: university,
                            majorUniversityIndex: majorUniversityIndex,
                            major: major,
                        }
                    ).then(response=>{
                        this.searchedPeople = response.data;
                    })
                }
            }





        }

        // 여기 검색 조건에 맞는 사람들 필터링하는거 추가해야됨.
    }
</script>

<style>
    #searchBox{
        border:3px solid #ffc952;
        height: auto;
        width: auto;
        margin-left:100px;
        margin-right:100px;
        align-content: center;
        text-align: center;
        margin-top:30px;
    }
    #selectBox{ /*검색 조건들 들어있는 박스. 1개*/
        width: auto;
        text-align: center;
        margin: auto;
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
        width: auto;
        /*margin-left: 250px;*/
        margin: auto;
        border: 1px solid;
        border-color: #dddfe6;
    }
</style>