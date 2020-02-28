library(plumber)
library(readr)
library(ggplot2)
library(psych)

#* @apiTitle Plumber Example API

#* @get /createmodel
#* @serializer unboxedJSON
createDataModel <- function() {
  topic <- c("มีรสชาติที่ถูกปาก",
             "มีบรรจุภัณฑ์ที่สวยงาม",
             "ดื่มได้สะดวกทันทีตามความต้องการ",
             "พกพาได้โดยสะดวก",
             "สามารถเก็บรักษาได้นาน",
             "เป็นยี่ห้อของคนไทย",
             "ความปลอดภัยในการบริโภค",
             "มีการระบุรายละเอียดที่ชัดเจนบนฉลาก"
  )
  choice1 <- c(10,10,15,20,50,5,0,20)
  choice2 <- c(15,30,5,20,10,5,0,10)
  choice3 <- c(22,30,20,20,20,30,10,25)
  choice4 <- c(23,10,23,20,10,20,30,25)
  choice5 <- c(30,20,37,20,10,40,60,20)
  score <- c(348,300,362,300,220,385,450,315)
  mean <- c(3.48,3.00,3.62,3.00,2.20,3.85,4.5,3.15)
  SD <- c(7.71,10,11.70,0,17.32,15.41,25.50,6.12)
  data <- c("มีความเห็นในส่วนนี้มาก","มีความเห็นในส่วนนี้ปานกลาง","มีความเห็นในส่วนนี้มาก","มีความเห็นในส่วนนี้ปานกลาง","มีความเห็นในส่วนนี้น้อย","มีความเห็นในส่วนนี้มาก","มีความเห็นในส่วนนี้มากที่สุด","มีความเห็นในส่วนนี้ปานกลาง")
  total <- choice1 + choice2 + choice3 + choice4 + choice5
  my_df <- data.frame(topic, choice1, choice2, choice3, choice4, choice5, total,score, mean, SD, data)
  list('survey' = my_df)
}

#* @get /createmodel2
#* @serializer unboxedJSON
createDataModel2 <- function() {
  topic <- c("มีรสชาติที่ถูกปาก",
             "มีบรรจุภัณฑ์ที่สวยงาม",
             "ดื่มได้สะดวกทันทีตามความต้องการ",
             "พกพาได้โดยสะดวก",
             "สามารถเก็บรักษาได้นาน",
             "เป็นยี่ห้อของคนไทย",
             "ความปลอดภัยในการบริโภค",
             "มีการระบุรายละเอียดที่ชัดเจนบนฉลาก"
  )
  choice1 <- c(0,10,15,20,20,5,0,45)
  choice2 <- c(0,10,15,20,20,5,10,10)
  choice3 <- c(10,30,20,20,20,30,10,25)
  choice4 <- c(30,10,23,20,20,20,30,10)
  choice5 <- c(60,20,37,20,20,40,50,100)
  score <- c(450,300,362,300,300,385,420,230)
  mean <- c(4.5,3.00,3.62,3.00,3.00,3.85,4.20,2.30)
  SD <- c(25.50,10,11.70,0,0,15.41,20,15.41)
  data <- c("มีความเห็นในส่วนนี้มากที่สุด","มีความเห็นในส่วนนี้ปานกลาง","มีความเห็นในส่วนนี้มาก","มีความเห็นในส่วนนี้ปานกลาง","มีความเห็นในส่วนนี้ปานกลาง","มีความเห็นในส่วนนี้มาก","มีความเห็นในส่วนนี้มากที่สุด","มีความเห็นในส่วนนี้น้อย")
  total <- choice1 + choice2 + choice3 + choice4 + choice5
  my_df <- data.frame(topic, choice1, choice2, choice3, choice4, choice5, total,score, mean, SD, data)
  list('survey' = my_df)
}

#* Plot
#* @png
#* @get /plot
function(){
  d<- ggplot(my_df, aes(x = topic, y = mean)) + 
            geom_bar(fill="deepskyblue2",alpha=0.5 ,stat = "identity") +
            coord_flip(ylim = c(1, 5))+
            theme_bw()
  print(d)
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

#* read thai string
Sys.setlocale("LC_CTYPE", "Thai")
options(encoding="UTF-8")


