$(function(){
    
    initCateInfo()
})
const form = layui.form
function initCateInfo(){
    $.ajax({
        type: "GET",
        url:'/my/article/cates',
        success: function(res){
            if(res.status!==0){
                return layer.msg('获取数据失败')
            }
            const htmlStr=template('tpl-table',res)
            // console.log(htmlStr);
            $('tbody').html(htmlStr)
        }
    })
}
 let addIndex=null
$('#btnAddCate').on('click',function(){
    addIndex=layer.open({
        type: 1,
        area: ['500px', '250px'],
        title: '添加文章分类',
        content: $('#dialog-add').html()
      })
})
$('body').on('submit','#form-add',function(e){
    e.preventDefault()
    // console.log('123');
    $.ajax({
        type: 'POST',
        url:'/my/article/addcates',
        data:$(this).serialize(),
        success: function(res){
            if(res.status!==0){
                return layer.msg('新增信息失败')
            }
            initCateInfo()
            layer.msg('新增信息成功')
            
            layer.close(addIndex)
           
            
        }
    })
})
var indexEdit = null
$('tbody').on('click', '.btn-edit', function() {
  // 弹出一个修改文章分类信息的层
  indexEdit = layer.open({
    type: 1,
    area: ['500px', '250px'],
    title: '修改文章分类',
    content: $('#dialog-edit').html()
  })
  const id=$(this).data('id')
  console.log(id);
  $.ajax({
    method: 'GET',
    url: '/my/article/cates/' + id,
    success: function(res) {
      form.val('form-edit', res.data)
    }
  })
})
$('body').on('submit', '#form-edit', function(e) {
    e.preventDefault()
    $.ajax({
          method: 'POST',
          url: '/my/article/updatecate',
          data: $(this).serialize(),
          success: function(res) {
            if (res.status !== 0) {
              return layer.msg('更新分类数据失败！')
            }
            layer.msg('更新分类数据成功！')
            layer.close(indexEdit)
            initCateInfo()
          }
    })
})
$('body').on('click','.btn-delete',function() {
  const id=$(this).data('id')
      // 提示用户是否要删除
      layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
        $.ajax({
          method: 'GET',
          url: '/my/article/deletecate/' + id,
          success: function(res) {
            if (res.status !== 0) {
              return layer.msg('删除分类失败！')
            }
            layer.msg('删除分类成功！')
            layer.close(index)
            initCateInfo()
          }
        })
      })
})