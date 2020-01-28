library(plumber)

#* @apiTitle Plumber Example API

#* @get /createmodel
#* @serializer unboxedJSON
createDataModel <- function() {
  q <- ("ความเหมาะสมของเมนูการใช้งาน")
  topic <- c(q,
             "ความรวดเร็วในการตอบสนองของระบบ",
             "การจัดการรักษาความปลอดภัย และกำหนดสิทธิ์ในการเข้าถึงข้อมูลของผู้ใช้งาน",
             "ความง่าย (User Friendly) ของการใช้งานของระบบ",
             "ระบบฐานข้อมูลฯช่วยลดปริมาณการใช้กระดาษ"
  )
  choice1 <- c(10,20,23,20,10)
  choice2 <- c(23,10,37,20,10)
  choice3 <- c(22,30,20,20,20)
  choice4 <- c(15,30,5,20,10)
  choice5 <- c(30,10,15,20,50)
  mean <- c(3.48,3,3.62,3,2.2)
  total <- choice1 + choice2 + choice3 + choice4 + choice5
  
  my_df <- data.frame(topic, choice1, choice2, choice3, choice4, choice5, total, mean)
  list('survey' = my_df)
}

#* Echo back the input
#* @param msg The message to echo
#* @get /echo
function(msg=""){
  list(msg = paste("The message is: '", msg, "'"))
}

#* Plot a histogram
#* @png
#* @get /plot
function(){
  rand <- rnorm(100)
  hist(rand)
}

#* Return the sum of two numbers
#* @param a The first number to add
#* @param b The second number to add
#* @post /sum
function(a, b){
  as.numeric(a) + as.numeric(b)
}

#* @filter cors
cors <- function(res) {  
    res$setHeader("Access-Control-Allow-Origin", "*") 
    plumber::forward()
}
