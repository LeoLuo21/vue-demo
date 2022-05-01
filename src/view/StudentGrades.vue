<template>
    <div class=".affix-container">
      <h5>学生成绩信息: </h5>
      <el-table :data="grades.slice((currentPage-1)*pageSize,currentPage*pageSize)" :height="tableHeight">
        <el-table-column prop="s_id" label="Id"/>
        <el-table-column prop="s_name" label="Name"/>
        <el-table-column prop="subject" label="Subject" />
        <el-table-column prop="score" label="Score" />
        <el-table-column prop="invigilator" label="Invigilator" />
        <el-table-column prop="papers_examiner" label="PapersExaminer" />
        <el-table-column prop="classroom_no" label="ClassroomNo" />
        <el-table-column prop="test_time" label="Timing" />
        <el-table-column prop="extra_info" label="ExtraInfo" />
        <el-table-column align="right">
            <template #header>
                <el-input v-model="searchText" size="small" placeholder="TypeToSearch" clearable @change="search" @input="afterChange"/>
            </template>
            <template #default="scope">
                <el-button size="small">Edit</el-button>
                <el-button size="small" type="danger">Delete</el-button>
            </template>
       </el-table-column>
      </el-table>
      <el-affix>
        <el-pagination v-model:page-size="pageSize" v-model:current-page="currentPage" :total="totalNum" layout="prev, pager, next, jumper"></el-pagination>
      </el-affix>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
     data() {
      return {
        tableHeight: window.innerHeight - 300,
        grades: [],
        currentPage: 1,
        pageSize: 6,
        searchText: '',
      }
     },
     methods: {
        search() {
          if(!this.searchText) {
             return
          } 
          this.grades = this.grades.filter((item,index) => {
             for (const value of Object.values(item)) {
                 if (value == this.searchText) return true
             }
             return false
          })
        },
        afterChange() {
          if(!this.searchText) {
            this.getAll()
          }
        },
        getAll() {
           let req = axios.get('http://localhost:9999')
           req.then( response => {
               this.grades = response.data.data
           })
        }
     },
     computed: {
        totalNum() {
            return this.grades.length
        }
     },
     created() {
        this.getAll()
     }
  }
</script>
