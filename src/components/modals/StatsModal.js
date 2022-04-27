import share from '../../share.svg'
import newWord from '../../newWord.svg'
import { BaseModal } from './BaseModal.js'

export const StatsModal = (props) => {

  const largestStat = props.stats.distribution.reduce((largest,current) => {
    return Math.max(largest, current)
  })
  const winPercent = Math.round(100 * props.stats.totalWon / Math.max(props.stats.practiced,1))

  return (
    <BaseModal 
      isShowing={props.showStatsModal} 
      titleImage="horizon1.png" 
      handleClose={props.handleClose}
      title="STATISTICS"
    >
        <div className="statistics-wrapper">
          <div className="statistics-row">
            <div className="statistics-column">
              <div className="statistic">{props.stats.practiced}</div>
              <div className="text">Practiced</div>
            </div>
            <div className="statistics-column">
              <div className="statistic">{winPercent}</div>
              <div className="text">Win %</div>
            </div>
            <div className="statistics-column">
              <div className="statistic">{props.stats.currentStreak}</div>
              <div className="text">Current<br /> Streak</div>
            </div>
            <div className="statistics-column">
              <div className="statistic">{props.stats.maxStreak}</div>
              <div className="text">Max<br /> Streak</div>
            </div>
          </div>
          <div className="sub-title">
            GUESS DISTRIBUTION
          </div>
          {props.stats.distribution.map( (num,i) => (
            <div className="bar-wrapper" key={i}>
              <div className="number">
                {i + 1}
              </div>
              <div className="bar" style={{ width: Math.round(100 * (num / largestStat) ) + '%' }}>{num}</div>
            </div>
          ))}
          { (props.gameWon || props.gameLost) && 
            <div className="button-wrapper">
              <div className="btn" onClick={() => props.handleRestart()}>NEW WORD <img src={newWord} alt="icon showing a word being replaced" /></div>
              <div className="divider"></div>
              <div className="btn" onClick={() => props.handleShare()}>SHARE <img src={share} alt="share icon" /></div>
            </div>
          }
        </div>
      </BaseModal>
  )
}