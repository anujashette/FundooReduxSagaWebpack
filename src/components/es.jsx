// Question style
                      {/* <div className='question-message-div'>
                                    <img src={keep} className='profile-picture' />
                                    <div>
                                        <div>
                                            <p className='timeDate'>{this.state.questionsArray.user.firstName} {this.state.questionsArray.user.lastName}
                                                <span>&nbsp;&nbsp;&nbsp;{this.handleDateDisplay(this.state.questionsArray.createdDate)}</span>
                                            </p>
                                            <p className='question-p' dangerouslySetInnerHTML={{ __html: this.state.questionsArray.message }} />
                                        </div>
                                        <div className='question-icon-div'>
                                            <Tooltip title='Reply'>
                                                <IconButton
                                                    className={classes.iconButton}
                                                    aria-describedby={id}
                                                    onClick={this.handleClick(this.state.questionsArray.id)}>
                                                    <ReplyIcon />
                                                </IconButton>
                                            </Tooltip>
                                            {this.state.questionsArray.like.length !== 0 ?

                                                this.state.questionsArray.like.map((likeObj, index) => {
                                                    if (likeObj.userId === localStorage.getItem('userId') && likeObj.like === true) {
                                                        return (<Tooltip title='Dislike' key={index}>
                                                            <IconButton className={classes.iconButton} onClick={() => this.handleDislike(this.state.questionsArray.id)}>
                                                                <Like />
                                                            </IconButton>
                                                        </Tooltip>)
                                                    } else {
                                                        return (<Tooltip title='Like' key={index}>
                                                            <IconButton className={classes.iconButton} onClick={() => this.handleLike(this.state.questionsArray.id)}>
                                                                <Dislike />
                                                            </IconButton>
                                                        </Tooltip>)
                                                    }
                                                })
                                                :
                                                <Tooltip title='Like'>
                                                    <IconButton className={classes.iconButton} onClick={() => this.handleDislike(this.state.questionsArray.id)}>
                                                        <Dislike />
                                                    </IconButton>
                                                </Tooltip>
                                            }
                                            <p className='like-p'>Likes {this.handleLikeCount(this.state.questionsArray)}</p>
                                            <span className='like-p'>
                                                <StarRatings
                                                    rating={this.handleRatingAvg(this.state.questionsArray)}
                                                    starRatedColor='rgb(255, 211, 58)'
                                                    starHoverColor='rgb(245, 224, 151)'
                                                    changeRating={(newRating) => this.changeRating(newRating, this.state.questionsArray.id)} numberOfStars={5}
                                                    starDimension="15px"
                                                    starSpacing="0px"
                                                />
                                            </span>
                                        </div>
                                    </div>
                                    {this.state.openLayer ?
                                        <ExpandLess style={{ cursor: 'pointer' }} onClick={()=>this.handleExpandClick('openLayer', this.state.openLayer)} />
                                        : <ExpandMore style={{ cursor: 'pointer' }} onClick={()=>this.handleExpandClick('openLayer', this.state.openLayer)} />}
                                </div> */}







// <List>
// <ListItem>
//     {
//         !this.state.isQuestionAsked ?
//             null
//             :
//             <div className='question-message-div'>
//                 <img src={keep} className='profile-picture' />
//                 <div>
//                     <div>
//                         <p className='timeDate'>{this.state.questionsArray.user.firstName} {this.state.questionsArray.user.lastName}
//                             <span>&nbsp;&nbsp;&nbsp;{this.handleDateDisplay(this.state.questionsArray.createdDate)}</span>
//                         </p>
//                         <p className='question-p' dangerouslySetInnerHTML={{ __html: this.state.questionsArray.message }} />
//                     </div>
//                     <div className='question-icon-div'>
//                         <Tooltip title='Reply'>
//                             <IconButton
//                                 className={classes.iconButton}
//                                 aria-describedby={id}
//                                 onClick={handleClick}>
//                                 <ReplyIcon />
//                             </IconButton>
//                         </Tooltip>
//                         {this.state.questionsArray.like.length !== 0 ?

//                             this.state.questionsArray.like.map((likeObj, index) => {
//                                 if (likeObj.userId === localStorage.getItem('userId') && likeObj.like === true) {
//                                     return (<Tooltip title='Dislike' key={index}>
//                                         <IconButton className={classes.iconButton} onClick={() => this.handleDislike(this.state.questionsArray.id)}>
//                                             <Like />
//                                         </IconButton>
//                                     </Tooltip>)
//                                 } else {
//                                     return (<Tooltip title='Like' key={index}>
//                                         <IconButton className={classes.iconButton} onClick={() => this.handleLike(this.state.questionsArray.id)}>
//                                             <Dislike />
//                                         </IconButton>
//                                     </Tooltip>)
//                                 }
//                             })
//                             :
//                             <Tooltip title='Like'>
//                                 <IconButton className={classes.iconButton} onClick={this.handleLike}>
//                                     <Dislike />
//                                 </IconButton>
//                             </Tooltip>
//                         }
//                         <p className='like-p'>Likes {this.handleLikeCount(this.state.questionsArray)}</p>
//                         <span className='like-p'>
//                             <StarRatings
//                                 rating={this.handleRatingAvg(this.state.questionsArray)}
//                                 starRatedColor='rgb(255, 211, 58)'
//                                 starHoverColor='rgb(245, 224, 151)'
//                                 changeRating={this.changeRating}
//                                 numberOfStars={5}
//                                 starDimension="15px"
//                                 starSpacing="0px"
//                             />
//                         </span>
//                     </div>
//                 </div>
//                 {this.state.open ? <ExpandLess style={{ cursor: 'pointer' }} onClick={this.handleExpandClick} /> : <ExpandMore style={{ cursor: 'pointer' }} onClick={this.handleExpandClick} />}
//             </div>
//         //     <AnswerList
//         //     answer={this.state.questionsArray}
//         //     handleDateDisplay={this.handleDateDisplay}
//         //     answerNumber={'question'}
//         //     id={id}
//         //     handleClick={handleClick}
//         //     handleLikeCount={this.handleLikeCount}
//         //     handleLike={this.handleLike}
//         //     handleDislike={this.handleDislike}
//         //     handleRatingAvg={this.handleRatingAvg}
//         //     changeRating={this.changeRating}
//         // />
//     }
// </ListItem>

// {/* First answer array */}
// {this.state.answerArray.map((answer, index) => {

//     return (<Collapse in={this.state.open} timeout="auto" unmountOnExit key={index}>
//         <List component="div" disablePadding>
//             {this.state.questionsArray.id === answer.parentId && answer.isApproved === true ?
//                 <div>
//                     < ListItem className={classes.nested}>
//                         {/* {displayAnswer(answer, 'firstAnswer')} */}

//                         <AnswerList
//                             answer={answer}
//                             handleDateDisplay={this.handleDateDisplay}
//                             answerNumber={'firstAnswer'}
//                             id={id}
//                             handleClick={handleClick}
//                             handleLikeCount={this.handleLikeCount}
//                             handleLike={this.handleLike}
//                             handleDislike={this.handleDislike}
//                             handleRatingAvg={this.handleRatingAvg}
//                             changeRating={this.changeRating}
//                         />

//                         {this.state.open ? <ExpandLess style={{ cursor: 'pointer' }} onClick={this.handleExpandClick} /> : <ExpandMore style={{ cursor: 'pointer' }} onClick={this.handleExpandClick} />}
//                     </ListItem>
//                     {/* <ListItem> */}

//                     <div>
//                         {/* Second answer array */}
//                         {this.state.answerArray.map((secondAnswer, index) => {
//                             return (<Collapse in={this.state.open} timeout="auto" unmountOnExit key={index}>
//                                 <List component="div" disablePadding>
//                                     {answer.isApproved === true && answer.id === secondAnswer.parentId ?
//                                         <div>
//                                             <ListItem className={classes.innerNested}>
//                                                 {/* {displayAnswer(secondAnswer, 'secondAnswer')} */}

//                                                 <AnswerList
//                                                     answer={secondAnswer}
//                                                     handleDateDisplay={this.handleDateDisplay}
//                                                     answerNumber={'secondAnswer'}
//                                                     id={id}
//                                                     handleClick={handleClick}
//                                                     handleLikeCount={this.handleLikeCount}
//                                                     handleLike={this.handleLike}
//                                                     handleDislike={this.handleDislike}
//                                                     handleRatingAvg={this.handleRatingAvg}
//                                                     changeRating={this.changeRating}
//                                                 />
//                                                 {this.state.open ? <ExpandLess style={{ cursor: 'pointer' }} onClick={this.handleExpandClick} /> : <ExpandMore style={{ cursor: 'pointer' }} onClick={this.handleExpandClick} />}
//                                             </ListItem>
//                                             <div className='third-answer-layer'>
//                                                 {/* Third answer array */}
//                                                 {this.state.answerArray.map((thirdAnswer, index) => {
//                                                     console.log('id 3--', thirdAnswer);
//                                                     return (<Collapse in={this.state.open} timeout="auto" unmountOnExit key={index}>
//                                                         <List component="div" disablePadding>
//                                                             {answer.isApproved === true && secondAnswer.id === thirdAnswer.parentId ?
//                                                                 <ListItem className={classes.innerInnerNested}>
//                                                                     {/* {displayAnswer(thirdAnswer, 'thirdAnswer')} */}

//                                                                     <AnswerList
//                                                                         answer={thirdAnswer}
//                                                                         handleDateDisplay={this.handleDateDisplay}
//                                                                         answerNumber={'thirdAnswer'}
//                                                                         id={id}
//                                                                         handleClick={handleClick}
//                                                                         handleLikeCount={this.handleLikeCount}
//                                                                         handleLike={this.handleLike}
//                                                                         handleDislike={this.handleDislike}
//                                                                         handleRatingAvg={this.handleRatingAvg}
//                                                                         changeRating={this.changeRating}
//                                                                     />
//                                                                     {/* {this.state.open ? <ExpandLess style={{ cursor: 'pointer' }} onClick={this.handleExpandClick} /> : <ExpandMore style={{ cursor: 'pointer' }} onClick={this.handleExpandClick} />} */}
//                                                                 </ListItem>
//                                                                 :
//                                                                 null
//                                                             }
//                                                         </List>
//                                                     </Collapse>)
//                                                 })}
//                                             </div>
//                                         </div>
//                                         :
//                                         null
//                                     }
//                                 </List>
//                             </Collapse>)
//                         })}

//                     </div>
//                     {/* </ListItem> */}
//                 </div>
//                 :
//                 null
//             }
//         </List>
//     </Collapse>)
// })}
// </List>
