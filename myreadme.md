
# commands used
I have used the following git commands:


```javascript
git add .            // to add all the changed stuff   
git status           // to see status  
git diff  
git commit - m "message"  
git push origin master  

git checkout master   // to checkout the master branch  
git checkout gh-pages // to checkout the gh-pages branch  

```

# normal workflow  

```javascript
git add .  
git status // to see what changes are going to be commited*  
git commit -m 'Some descriptive commit message'  
git push origin master  

git checkout gh-pages // go to the gh-pages branch  
git rebase master // bring gh-pages up to date with master  
git push origin gh-pages // commit the changes  
git checkout master // return to the master branch 

```